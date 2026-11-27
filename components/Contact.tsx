"use client";

import { Words } from "./Language";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { contact, projects } from "../data";
import { copy, type Locale } from "../lib/locale";
import { templates, mailContent, type Topic } from "../lib/inquiry";

export function Contact({ locale }: { locale: Locale }) {
	const t = copy[locale];
	const options = templates[locale];
	const [projectName, setProjectName] = useState("…");
	const [enabled, setEnabled] = useState(false);
	const [topic, setTopic] = useState<Topic>("recruit");
	const [drafts, setDrafts] = useState<Partial<Record<Topic, string>>>({});
	const [name, setName] = useState(""),
		[email, setEmail] = useState("");
	const [state, setState] = useState<
		"idle" | "sending" | "sent" | "draft" | "error" | "limited"
	>("idle");
	const attempt = useRef({ body: "", token: "" });
	const busy = useRef(false);
	const message =
		drafts[topic] ?? options[topic].message.replace("{project}", projectName);
	useEffect(() => {
		const abort = new AbortController();
		fetch("/api/contact", { signal: abort.signal })
			.then((r) => r.json())
			.then((data) => setEnabled(data.enabled === true))
			.catch(() => {});
		const slug = new URLSearchParams(location.search).get("du-an");
		const p = projects.find((item) => item.slug === slug);
		if (p) {
			setTopic("project");
			setProjectName(p.title);
		}
		return () => abort.abort();
	}, []);
	const { subject, text } = mailContent(
		{ name, email, topic, message },
		locale,
	);
	const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (busy.current) return;
		if (!message.trim()) {
			const field = event.currentTarget.elements.namedItem(
				"message",
			) as HTMLTextAreaElement;
			field.setCustomValidity(t.empty);
			field.reportValidity();
			field.setCustomValidity("");
			return;
		}
		if (!enabled) {
			setState("draft");
			window.location.href = mailto;
			return;
		}
		const website = new FormData(event.currentTarget).get("website");
		const payload = {
			name: name.trim(),
			email: email.trim(),
			locale,
			topic,
			message: message.trim(),
			website,
		};
		const body = JSON.stringify(payload);
		busy.current = true;
		setState("sending");
		try {
			if (attempt.current.body !== body)
				attempt.current = { body, token: crypto.randomUUID() };
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...payload, token: attempt.current.token }),
			});
			if (response.ok && (await response.json()).ok) setState("sent");
			else setState(response.status === 429 ? "limited" : "error");
		} catch {
			setState("error");
		} finally {
			busy.current = false;
		}
	}
	function newMessage() {
		attempt.current = { body: "", token: "" };
		setDrafts({});
		setName("");
		setEmail("");
		setState("idle");
	}
	return (
		<section
			className="contact-section"
			id="lien-he"
			aria-labelledby="contact-heading"
		>
			<div className="wrap contact-grid">
				<div>
					<h2 id="contact-heading">
						<Words text={t.contact} />
						<span>.</span>
					</h2>
					<p>
						<Words text={t.invite} />
					</p>
					<a className="underlink" href={`mailto:${contact.email}`}>
						{contact.email} <ArrowUpRight size={17} />
					</a>
				</div>
				<form
					action={`mailto:${contact.email}`}
					method="post"
					encType="text/plain"
					onSubmit={submit}
					onChange={() => {
						if (state !== "sending") setState("idle");
					}}
				>
					{state === "sent" ? (
						<div className="form-success" role="status">
							<h3>
								<Words text={t.sent} />
							</h3>
							<p>
								{t.reply} {email}.
							</p>
							<button className="underlink" type="button" onClick={newMessage}>
								{t.another} <ArrowUpRight size={16} />
							</button>
						</div>
					) : (
						<fieldset disabled={state === "sending"}>
							<legend>
								<Words text={t.templates} />
							</legend>
							<div className="topics">
								{(Object.keys(options) as Topic[]).map((key) => (
									<button
										key={key}
										type="button"
										aria-pressed={key === topic}
										onClick={() => {
											setTopic(key);
											setState("idle");
										}}
									>
										{options[key].title}
									</button>
								))}
							</div>
							<div className="form-row">
								<label>
									<Words text={t.name} />
									<input
										required
										maxLength={90}
										pattern=".*\S.*"
										name="name"
										autoComplete="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</label>
								<label>
									<Words text={t.email} />
									<input
										required
										type="email"
										maxLength={254}
										name="email"
										autoComplete="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</label>
							</div>
							<label>
								<Words text={t.message} />
								<textarea
									name="message"
									required
									maxLength={3000}
									rows={5}
									value={message}
									onChange={(e) =>
										setDrafts({ ...drafts, [topic]: e.target.value })
									}
								/>
							</label>
							<label className="trap" aria-hidden="true">
								Website
								<input name="website" tabIndex={-1} autoComplete="off" />
							</label>
							<div className="form-end">
								<button type="submit" className="action">
									{state === "sending"
										? t.sending
										: enabled
											? t.send
											: t.openDraft}{" "}
									<Send size={16} />
								</button>
								{!enabled && (
									<small>
										<Words text={t.draftHint} />
									</small>
								)}
							</div>
							{state === "draft" && (
								<p className="feedback" role="status">
									{t.draftReady} {contact.email}.
								</p>
							)}
							{(state === "error" || state === "limited") && (
								<p className="feedback" role="alert">
									{state === "limited" ? t.limited : t.failed}{" "}
									<a href={mailto}>{t.openApp}</a>
								</p>
							)}
						</fieldset>
					)}
				</form>
			</div>
		</section>
	);
}
