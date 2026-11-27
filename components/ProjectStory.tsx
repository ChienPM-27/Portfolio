"use client";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";

import { Header, Footer } from "./Chrome";
import { ProjectArt } from "./ProjectArt";
import { ProjectTitle } from "./ProjectTitle";
import { AblationResults } from "./AblationResults";
import { getProjects } from "../data";
import { useLanguage, Words } from "./Language";
import { copy } from "../lib/locale";

export function ProjectStory({ slug }: { slug: string }) {
	const { locale } = useLanguage();
	const projects = getProjects(locale);
	const t = copy[locale];
	const index = projects.findIndex((p) => p.slug === slug);

	const p = projects[index],
		next = projects[(index + 1) % projects.length];
	return (
		<>
			<a href="#main" className="skip">
				{t.skip}
			</a>
			<Header locale={locale} />
			<main id="main" className="wrap case">
				<a className="inline-link back-link" href={`/#chuong-${slug}`}>
					<ArrowLeft size={17} /> <Words text={t.featured} />
				</a>
				<div className="case-lead">
					<div>
						<h1>
							<ProjectTitle title={p.title} />
						</h1>
						<p className="category">
							<Words text={p.category} />
						</p>
						<p className="case-summary">
							<Words text={p.summary} />
						</p>
						<p className="stack-line">{p.stack.join(" · ")}</p>
						{p.role && <p><Words text={p.role} /></p>}
					</div>
					{p.media ? (
						<figure className="case-media">
							{p.media.kind === "video" && p.media.captions ? (
								<video
									controls
									preload="metadata"
									playsInline
									poster={p.media.poster}
									aria-label={p.media.description}
									src={p.media.src}
								>
									<track
										kind="captions"
										srcLang="vi"
										label="Tiếng Việt"
										src={p.media.captions}
									/>
								</video>
							) : p.media.kind === "video" ? (
								<video
									controls
									muted
									playsInline
									preload="metadata"
									src={p.media.src}
									poster={p.media.poster}
									aria-label={p.media.description}
								/>
							) : (
								<img alt={p.media.description} src={p.media.src} />
							)}
							<figcaption>
								{p.website ? (
									<a className="inline-link" href={p.website}>
										<Words text={locale === "vi" ? "Mở website Brew-Lite" : "Visit Brew-Lite"} />
										<ArrowUpRight size={16} />
									</a>
								) : p.media.description}
							</figcaption>
						</figure>
					) : (
						<ProjectArt project={p} />
					)}
				</div>
				<section className="case-story">
					<h2>
						<Words text={p.question} />
					</h2>
					<div>
						<p>
							<Words text={p.method} />
						</p>
						<p>
							<Words text={p.outcome} />
						</p>
						<div className="case-links">
							{p.repo ? (
								<a className="underlink" href={p.repo}>
									<Github size={17} /> <Words text={t.code} />{" "}
									<ArrowUpRight size={16} />
								</a>
							) : (
								<a className="underlink" href={`/?du-an=${p.slug}#lien-he`}>
									<Words text={t.privateCode} /> <ArrowUpRight size={16} />
								</a>
							)}
							{p.report && (
								<a className="inline-link" href={p.report}>
									<Words text={t.report} /> <ArrowUpRight size={16} />
								</a>
							)}
						</div>
					</div>
				</section>
				{p.slug === "remora-production" && (
					<section className="case-story">
						<div>
							<h2>SGU Hackathon 2026</h2>
							<p><Words text={locale === "vi"
								? "Remora là một trong 7 đội được vào thẳng vòng coding."
								: "Remora was one of seven teams selected to advance directly to the coding round."} /></p>
						</div>
						<img src="/remora/sgu-hackathon-2026.jpg" width={1600} height={1200}
							style={{ width: "100%", height: "auto" }} loading="lazy"
							alt={locale === "vi" ? "Poster đội Remora tại SGU Hackathon 2026" : "Remora team poster at SGU Hackathon 2026"} />
					</section>
				)}
				{p.art === "gesture" && <AblationResults locale={locale} />}
				<a className="next-study" href={`/du-an/${next.slug}`}>
					<span>
						<Words text={t.next} />
					</span>
					<strong>
						<ProjectTitle title={next.title} />
					</strong>
					<ArrowRight />
				</a>
			</main>
			<Footer />
		</>
	);
}
