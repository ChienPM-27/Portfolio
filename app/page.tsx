"use client";
import { ArrowDown, ArrowDownToLine, ArrowUpRight, MapPin } from "lucide-react";
import { Header, Footer } from "../components/Chrome";
import { Catalog } from "../components/Catalog";
import { Contact } from "../components/Contact";
import { HeroSculpture } from "../components/HeroSculpture";
import { getProjects } from "../data";
import { useLanguage, Words } from "../components/Language";
import { copy } from "../lib/locale";

export default function Home() {
	const { locale } = useLanguage();
	const t = copy[locale];
	const projects = getProjects(locale);
	return (
		<>
			<a href="#main" className="skip">
				{t.skip}
			</a>
			<Header locale={locale} />
			<main id="main">
				<section className="cover" aria-labelledby="ten">
					<div className="wrap cover-inner">
						<div className="cover-copy">
							<h1 id="ten">
								Phạm Minh
								<br />
								Chiến<span>.</span>
							</h1>
							<p className="profession">AI Engineer Intern</p>
							<div className="cover-actions">
								<a className="action" href="#du-an">
									<Words text={t.explore} /> <ArrowDown size={17} />
								</a>
								<a className="inline-link" href="/cv.pdf" download>
									<Words text={t.cv} /> <ArrowDownToLine size={16} />
								</a>
							</div>
						</div>
						<HeroSculpture locale={locale} />
					</div>
					<div className="wrap cover-foot">
						<span>
							<MapPin size={15} /> <Words text={t.city} />
						</span>
						<span>
							<Words text={t.university} />
						</span>
					</div>
				</section>
				<Catalog locale={locale} projects={projects} />
				<section className="skills" id="ho-so" aria-labelledby="skills-heading">
					<div className="wrap skills-grid">
						<div>
							<h2 id="skills-heading">
								<Words text={t.skills} /> <br />
								<Words text={t.skillsEnd} />
								<span>.</span>
							</h2>
							<p className="skills-intro">
								<Words text={t.skillsIntro} />
							</p>
						</div>
						<div className="skill-list">
							{projects.map((project) => (
								<article key={project.slug}>
									<h3>
										<Words text={project.skill} />
									</h3>
									<p>
										<Words text={project.proof} />
									</p>
									<p className="stack-line">{project.stack.join(" · ")}</p>
									<a className="inline-link" href={`/du-an/${project.slug}`}>
										{project.title}
										<ArrowUpRight size={15} />
									</a>
								</article>
							))}
						</div>
					</div>
				</section>
				<Contact locale={locale} />
			</main>
			<Footer />
		</>
	);
}
