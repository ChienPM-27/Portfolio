import { Words } from "./Language";
import { ArrowUpRight, Github } from "lucide-react";
import { contact } from "../data";
import { copy, type Locale } from "../lib/locale";
import { Preferences } from "./Preferences";

export function Mark() {
	return (
		<svg width="31" height="31" viewBox="0 0 32 32" aria-hidden="true">
			<rect width="32" height="32" rx="5" fill="#fc653e" />
			<path d="M6 23L13 9h4l-7 14zm8 0 7-14h5l-7 14z" fill="#22251e" />
		</svg>
	);
}

export function Header({ locale }: { locale: Locale }) {
	const t = copy[locale];
	return (
		<header className="mast">
			<div className="wrap mast-inner">
				<a
					className="signature"
					href="/"
					aria-label={`Phạm Minh Chiến · ${t.home}`}
				>
					<Mark /> PMC
				</a>
				<nav aria-label={t.nav}>
					<a href="/#du-an">
						<Words text={t.work} />
					</a>
					<a href="/#ho-so">
						<Words text={t.skills} />
					</a>
					<a href="/#lien-he">
						<Words text={t.contact} /> <ArrowUpRight size={15} />
					</a>
				</nav>
				<Preferences locale={locale} />
			</div>
		</header>
	);
}

export function Footer() {
	return (
		<footer className="colophon">
			<div className="wrap">
				<a className="signature" href="/">
					<Mark /> Phạm Minh Chiến
				</a>
				<a className="inline-link" href={contact.github}>
					<Github size={17} /> GitHub <ArrowUpRight size={15} />
				</a>
			</div>
		</footer>
	);
}
