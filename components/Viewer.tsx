"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Grip, RotateCcw, RotateCw } from "lucide-react";
import { chair, colors, project } from "../geometry/chair";

export function Viewer() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const orbit = useRef(0.65);
	const level = useRef(1);
	const request = useRef<() => void>(() => {});
	const [fine, setFine] = useState(true);
	useEffect(() => {
		const node = canvas.current;
		if (!node) return;
		const ctx = node.getContext("2d");
		if (!ctx) return;
		let frame = 0,
			visible = false,
			width = 0,
			height = 0,
			drag: number | null = null,
			pointer: number | null = null;
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		function draw() {
			frame = 0;
			if (!ctx || !node || !width || !height) return;
			ctx.clearRect(0, 0, width, height);
			const scale = Math.min(width * 0.33, height * 0.247);
			const tilt =
				0.28 + (motion.matches ? 0 : Math.min(0.15, window.scrollY / 2400));
			const angle = orbit.current;
			const cx = width * 0.5,
				cy = height * 0.51;
			const at = (p: readonly [number, number, number]) => {
				const [x, y] = project(p, angle, tilt);
				return [cx + x * scale, cy + y * scale];
			};
			ctx.strokeStyle = "rgba(161,180,149,.16)";
			ctx.lineWidth = 0.7;
			ctx.beginPath();
			for (let i = -5; i <= 5; i++) {
				const v = i * 0.38;
				for (const [a, b] of [
					[at([v, -1.42, -1.9]), at([v, -1.42, 1.9])],
					[at([-1.9, -1.42, v]), at([1.9, -1.42, v])],
				]) {
					ctx.moveTo(a[0], a[1]);
					ctx.lineTo(b[0], b[1]);
				}
			}
			ctx.stroke();
			for (let tone = 0; tone < 4; tone++) {
				ctx.fillStyle = colors[tone];
				ctx.beginPath();
				for (let i = 0; i < chair.length; i += level.current) {
					const s = chair[i];
					if (s.tone !== tone) continue;
					const [x, y] = at(s.point);
					ctx.rect(
						x,
						y,
						level.current === 1 ? 1.8 : 2.4,
						level.current === 1 ? 1.8 : 2.4,
					);
				}
				ctx.fill();
			}
			node.style.opacity = "1";
		}
		function queue() {
			if (visible && !document.hidden && !frame)
				frame = requestAnimationFrame(draw);
		}
		request.current = queue;
		const size = new ResizeObserver(() => {
			const r = node.getBoundingClientRect();
			width = r.width;
			height = r.height;
			const d = Math.min(1.5, devicePixelRatio);
			node.width = Math.round(width * d);
			node.height = Math.round(height * d);
			ctx.setTransform(d, 0, 0, d, 0, 0);
			queue();
		});
		const seen = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) queue();
		});
		size.observe(node);
		seen.observe(node);
		function down(e: PointerEvent) {
			if (!node || pointer !== null) return;
			pointer = e.pointerId;
			drag = e.clientX;
			node.setPointerCapture(e.pointerId);
		}
		function move(e: PointerEvent) {
			if (drag === null || e.pointerId !== pointer) return;
			orbit.current += (e.clientX - drag) * 0.012;
			drag = e.clientX;
			queue();
		}
		function up(e: PointerEvent) {
			if (pointer === e.pointerId) {
				drag = null;
				pointer = null;
			}
		}
		node.addEventListener("pointerdown", down);
		node.addEventListener("pointermove", move);
		node.addEventListener("lostpointercapture", up);
		window.addEventListener("scroll", queue, { passive: true });
		document.addEventListener("visibilitychange", queue);
		motion.addEventListener("change", queue);
		return () => {
			cancelAnimationFrame(frame);
			size.disconnect();
			seen.disconnect();
			node.removeEventListener("pointerdown", down);
			node.removeEventListener("pointermove", move);
			node.removeEventListener("lostpointercapture", up);
			window.removeEventListener("scroll", queue);
			document.removeEventListener("visibilitychange", queue);
			motion.removeEventListener("change", queue);
			request.current = () => {};
		};
	}, []);
	return (
		<section className="viewer" aria-label="Trình quan sát point cloud">
			<div className="viewport">
				<div className="viewhead">
					<span>
						<Box size={15} /> 3DRECON / POINT CLOUD
					</span>
					<span className="live">TƯƠNG TÁC</span>
				</div>
				<canvas
					ref={canvas}
					aria-label="Ghế dạng point cloud màu hổ phách. Kéo ngang hoặc dùng nút xoay."
				/>
				<div className="viewlower">
					<span className="axis">
						Y<br />
						└─ X
					</span>
					<button
						type="button"
						onClick={() => {
							level.current = fine ? 5 : 1;
							setFine(!fine);
							request.current();
						}}
					>
						<Grip size={14} />
						{fine ? "Mẫu tinh" : "Mẫu thô"}
					</button>
				</div>
			</div>
			<div className="viewfoot">
				<span>
					<span className="cross">✳</span> Kéo để xoay vật thể
				</span>
				<div>
					{[-1, 1].map((dir) => (
						<button
							type="button"
							key={dir}
							aria-label={dir === 1 ? "Xoay phải" : "Xoay trái"}
							onClick={() => {
								orbit.current += dir * 0.3;
								request.current();
							}}
						>
							{dir === 1 ? <RotateCw size={15} /> : <RotateCcw size={15} />}
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
