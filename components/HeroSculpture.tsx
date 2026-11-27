"use client";

import { copy, type Locale } from "../lib/locale";
import { Rotate3d } from "lucide-react";
import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const COUNT = 152;

// Cross-sections of a trefoil. The depth order reveals an over-under weave.
function center(t: number) {
	const ring = 1.34 + 0.49 * Math.cos(3 * t);
	return [
		ring * Math.cos(2 * t),
		ring * Math.sin(2 * t),
		0.79 * Math.sin(3 * t),
	];
}

const sections = Array.from({ length: COUNT }, (_, i) => {
	const t = (i / COUNT) * TAU;
	const c = center(t);
	const next = center(t + 0.001);
	const delta = next.map((v, axis) => v - c[axis]);
	const length = Math.hypot(...delta);
	return { c, normal: delta.map((v) => v / length), index: i };
});

function draw(canvas: HTMLCanvasElement, yaw: number, pitch: number) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const { width: w, height: h } = canvas;
	const scale = Math.min(w / 5.2, h / 5.12);
	const cy = Math.cos(yaw),
		sy = Math.sin(yaw);
	const cx = Math.cos(pitch),
		sx = Math.sin(pitch);
	const roll = -0.34,
		cr = Math.cos(roll),
		sr = Math.sin(roll);
	function rotate([x, y, z]: number[]) {
		const u = x * cy + z * sy,
			depth = z * cy - x * sy;
		const v = y * cx - depth * sx;
		return [u * cr - v * sr, u * sr + v * cr, y * sx + depth * cx];
	}
	ctx.clearRect(0, 0, w, h);
	const layers = sections
		.map((s) => ({ c: rotate(s.c), n: rotate(s.normal), index: s.index }))
		.sort((a, b) => a.c[2] - b.c[2]);
	for (const { c, n, index } of layers) {
		const perspective = 7.6 / (7.6 - c[2]);
		const x = w / 2 + c[0] * scale * perspective;
		const y = h / 2 - c[1] * scale * perspective;
		const r =
			scale *
			(0.48 + 0.065 * Math.cos((index / COUNT) * TAU * 3)) *
			perspective;
		const angle = Math.atan2(n[0], n[1]);
		const shade = 0.5 + 0.5 * (n[0] * -0.37 + n[1] * 0.57 + n[2] * 0.73);
		const pulse = index % 4 === 0 ? 3 : 0;
		ctx.beginPath();
		ctx.ellipse(x, y, r, r * Math.max(0.015, Math.abs(n[2])), angle, 0, TAU);
		ctx.fillStyle = `hsl(${12 + 5 * shade} 89% ${22 + shade * 32 + pulse}%)`;
		ctx.fill();
		ctx.strokeStyle = `hsl(${15 + 7 * shade} 96% ${40 + shade * 35}%)`;
		ctx.lineWidth = Math.max(0.8, scale * 0.0075);
		ctx.stroke();
	}
}

export function HeroSculpture({ locale }: { locale: Locale }) {
	const t = copy[locale];
	const ref = useRef<HTMLCanvasElement>(null);
	const turn = useRef<() => void>(() => {});
	useEffect(() => {
		const canvas = ref.current;
		const hero = canvas?.closest("section");
		if (!canvas || !hero || !canvas.getContext("2d")) return;
		const preference = matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0,
			visible = true,
			step = 0;
		let yaw = -0.22,
			pitch = 0.59,
			tx = 0,
			ty = 0,
			scroll = 0;
		function paint() {
			frame = 0;
			const targetYaw = -0.22 + step + tx + scroll;
			const targetPitch = 0.59 + ty;
			const easing = preference.matches ? 1 : 0.14;
			yaw += (targetYaw - yaw) * easing;
			pitch += (targetPitch - pitch) * easing;
			if (canvas) {
				draw(canvas, yaw, pitch);
				if (!canvas.dataset.painted) canvas.dataset.painted = "true";
			}
			if (Math.abs(targetYaw - yaw) + Math.abs(targetPitch - pitch) > 0.001)
				queue();
		}
		function queue() {
			if (visible && !frame) frame = requestAnimationFrame(paint);
		}
		function resize() {
			if (!canvas) return;
			const ratio = Math.min(devicePixelRatio || 1, 1.65);
			canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
			canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
			queue();
		}
		function move(event: PointerEvent) {
			if (preference.matches || event.pointerType === "touch" || !hero) return;
			const box = hero.getBoundingClientRect();
			tx = ((event.clientX - box.left) / box.width - 0.5) * 0.75;
			ty = (0.5 - (event.clientY - box.top) / box.height) * 0.5;
			queue();
		}
		function reset() {
			tx = 0;
			ty = 0;
			queue();
		}
		function onScroll() {
			if (!visible || !hero) return;
			scroll = preference.matches
				? 0
				: Math.min(
						1,
						Math.max(0, -hero.getBoundingClientRect().top / hero.clientHeight),
					) * 0.5;
			queue();
		}
		function motionChange() {
			reset();
			onScroll();
		}
		turn.current = () => {
			step += Math.PI / 4;
			queue();
		};
		const size = new ResizeObserver(resize);
		const visibility = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) onScroll();
		});
		size.observe(canvas);
		visibility.observe(hero);
		hero.addEventListener("pointermove", move);
		hero.addEventListener("pointerleave", reset);
		window.addEventListener("scroll", onScroll, { passive: true });
		preference.addEventListener("change", motionChange);
		resize();
		return () => {
			cancelAnimationFrame(frame);
			size.disconnect();
			visibility.disconnect();
			hero.removeEventListener("pointermove", move);
			hero.removeEventListener("pointerleave", reset);
			window.removeEventListener("scroll", onScroll);
			preference.removeEventListener("change", motionChange);
		};
	}, []);
	return (
		<div className="sculpture">
			<canvas ref={ref} role="img" aria-label={t.sculpture} />
			<button type="button" onClick={() => turn.current()}>
				<Rotate3d size={18} /> {t.rotate}
			</button>
		</div>
	);
}
