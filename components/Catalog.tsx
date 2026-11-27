"use client";

import { Words } from "./Language";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Project } from "../data";
import { copy, type Locale } from "../lib/locale";
import { ProjectArt } from "./ProjectArt";
import { ProjectTitle } from "./ProjectTitle";

function FeaturedPreview({ project }: { project: Project }) {
	const media = project.media;
	if (project.slug === "remora-production") {
		return (
			<img className="featured-demo" src="/remora/sgu-hackathon-2026.jpg"
				alt="Remora — SGU Hackathon 2026" width={1600} height={1200}
				loading="lazy" style={{ aspectRatio: "4 / 3", maxHeight: "68svh", objectFit: "contain" }} />
		);
	}
	if (media?.kind === "image") {
		return <img className="featured-demo" src={media.src} alt={media.description}
			width={1265} height={712} loading="lazy" style={{ aspectRatio: "auto" }} />;
	}
	if (project.art === "gesture" && media?.kind === "video") {
		return (
			<video className="featured-demo" controls playsInline preload="none"
				src={media.src} poster={media.poster} aria-label={media.description} />
		);
	}
	return <ProjectArt project={project} />;
}

export function Catalog({
	locale,
	projects,
}: {
	locale: Locale;
	projects: Project[];
}) {
	const t = copy[locale];
	const [active, setActive] = useState(0);
	const [filter, setFilter] = useState("");
	const list = useRef<HTMLDivElement>(null);
	const visible = useMemo(
		() => projects.filter((p) => !filter || p.art === filter),
		[projects, filter],
	);
	const selected = visible[active] ?? visible[0];

	useEffect(() => {
		const chapters = visible.flatMap((p) => {
			const chapter = document.getElementById(`chuong-${p.slug}`);
			return chapter ? [chapter] : [];
		});
		let frame = 0;
		function measure() {
			frame = 0;
			const mid = window.innerHeight * 0.5;
			let closest = 0,
				distance = Infinity;
			chapters.forEach((chapter, i) => {
				const rect = chapter.getBoundingClientRect();
				const delta = Math.abs(rect.top + rect.height / 2 - mid);
				if (delta < distance) {
					closest = i;
					distance = delta;
				}
			});
			setActive(closest);
		}
		function queue() {
			if (!frame) frame = requestAnimationFrame(measure);
		}
		const observer = new ResizeObserver(queue);
		if (list.current) observer.observe(list.current);
		window.addEventListener("scroll", queue, { passive: true });
		window.addEventListener("resize", queue);
		queue();
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener("scroll", queue);
			window.removeEventListener("resize", queue);
		};
	}, [visible]);

	return (
		<section className="works" id="du-an" aria-labelledby="works-title">
			<div className="wrap">
				<div className="works-head">
					<h2 id="works-title">
						<Words text={t.featured} />
						<span>.</span>
					</h2>
					<label className="domain-filter">
						<select
							aria-label={t.filter}
							value={filter}
							onChange={(e) => {
								setActive(0);
								setFilter(e.target.value);
							}}
						>
							<option value="">{t.all}</option>
							{projects.map((p) => (
								<option key={p.slug} value={p.art}>
									{p.category}
								</option>
							))}
						</select>
						<ArrowDown size={15} />
					</label>
				</div>
				<div className="chapters">
					<div className="pinned-plate">
						<FeaturedPreview key={selected.slug} project={selected} />
						<nav className="chapter-index" aria-label={t.jump}>
							{visible.map((p, i) => (
								<a
									key={p.slug}
									href={`#chuong-${p.slug}`}
									aria-current={active === i ? "location" : undefined}
								>
									{p.title}
								</a>
							))}
						</nav>
					</div>
					<div className="chapter-list" ref={list}>
						{visible.map((p) => (
							<article key={p.slug} id={`chuong-${p.slug}`}>
								<div className="inline-plate">
									<FeaturedPreview project={p} />
								</div>
								<h3>
									<a href={`/du-an/${p.slug}`}>
										<ProjectTitle title={p.title} />
									</a>
								</h3>
								<p className="category">{p.category}</p>
								<p className="chapter-summary">
									<Words text={p.summary} />
								</p>
								<a className="underlink" href={`/du-an/${p.slug}`}>
									<Words text={t.story} /> <ArrowUpRight size={17} />
								</a>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
