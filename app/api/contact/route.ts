import { NextResponse } from "next/server";
import { contact } from "../../../data";
import { isTopic, mailContent } from "../../../lib/inquiry";

export const dynamic = "force-dynamic";
const windowMs = 10 * 60_000;
const requests = new Map<string, { count: number; until: number }>();
function limited(ip: string) {
	const now = Date.now();
	const bucket = requests.get(ip);
	if (bucket && bucket.until > now) return ++bucket.count > 5;
	for (const [key, entry] of requests)
		if (entry.until <= now) requests.delete(key);
	requests.set(ip, { count: 1, until: now + windowMs });
	return false;
}

function configured() {
	return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}
export function GET() {
	return NextResponse.json(
		{ enabled: configured() },
		{ headers: { "Cache-Control": "no-store" } },
	);
}
function failure(code: number) {
	return NextResponse.json({ ok: false }, { status: code });
}

export async function POST(request: Request) {
	if (!configured()) return failure(503);
	const origin = request.headers.get("origin");
	if (origin && origin !== new URL(request.url).origin) return failure(403);
	if (!request.headers.get("content-type")?.startsWith("application/json"))
		return failure(415);
	const raw = await request.text();
	if (raw.length > 18000) return failure(413);
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return failure(400);
	}
	if (!parsed || typeof parsed !== "object") return failure(400);
	const {
		name,
		email,
		topic,
		message,
		website,
		token,
		locale = "vi",
	} = parsed as Record<string, unknown>;
	if (
		website ||
		typeof name !== "string" ||
		!name.trim() ||
		name.length > 90 ||
		/[\r\n]/.test(name) ||
		typeof email !== "string" ||
		email.length > 254 ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
		!isTopic(topic) ||
		(locale !== "vi" && locale !== "en") ||
		typeof message !== "string" ||
		!message.trim() ||
		message.length > 3000 ||
		typeof token !== "string" ||
		!/^[0-9a-f-]{36}$/i.test(token)
	)
		return failure(422);

	const ip =
		request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
		request.headers.get("x-real-ip") ||
		"local";
	if (limited(ip)) return failure(429);
	const { subject, text } = mailContent(
		{ name, email, topic, message },
		locale,
	);
	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
				"Idempotency-Key": `portfolio/${token}`,
			},
			body: JSON.stringify({
				from: process.env.CONTACT_FROM_EMAIL,
				to: [contact.email],
				reply_to: email,
				subject,
				text,
			}),
			signal: AbortSignal.timeout(10000),
		});
		if (!response.ok || !(await response.json()).id) return failure(502);
		return NextResponse.json({ ok: true });
	} catch {
		return failure(502);
	}
}
