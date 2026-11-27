"use client";
import { ArrowLeft } from "lucide-react";
import { Footer, Header } from "../components/Chrome";
import { copy } from "../lib/locale";
import { useLanguage } from "../components/Language";

export default function NotFound() {
	const { locale } = useLanguage();
	const t = copy[locale];
	return (
		<>
			<Header locale={locale} />
			<main className="wrap case">
				<h1>404</h1>
				<p className="case-summary">{t.missing}</p>
				<a className="inline-link" href="/">
					<ArrowLeft size={17} />
					{t.home}
				</a>
			</main>
			<Footer />
		</>
	);
}
