"use client";

import { useLanguage } from "./Language";
import { useEffect, useId, useRef, type MouseEvent } from "react";
import { copy, themeCookie, type Locale } from "../lib/locale";
import { revealTheme } from "../lib/theme-reveal";

function remember(name: string, value: string) {
	document.cookie = `${name}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function Preferences({ locale }: { locale: Locale }) {
	const { changeLanguage } = useLanguage();

	const selection = locale;
	const marker = useRef<HTMLSpanElement>(null);
	const finishReveal = useRef<(() => void) | undefined>(undefined);
	const maskId = useId();
	const t = copy[locale];
	useEffect(() => {
		return () => {
			finishReveal.current?.();
		};
	}, []);

	function switchLanguage(next: Locale) {
		if (next === selection) return;
		const pill = marker.current;
		if (pill && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
			const scale = getComputedStyle(pill).scale;
			pill.animate(
				[
					{ scale: scale === "none" ? "1" : scale },
					{ scale: "0.46 0.57", offset: 0.38 },
					{ scale: "0.55 0.61", offset: 0.53 },
					{ scale: "1.025 0.985", offset: 0.87 },
					{ scale: "1" },
				],
				{ duration: 480, easing: "ease-in-out" },
			);
		}
		changeLanguage(next);
	}

	function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
		// Commit an interrupted choice before calculating the next direction.
		finishReveal.current?.();
		const theme = document.documentElement.dataset.theme;
		const dark = theme
			? theme === "dark"
			: matchMedia("(prefers-color-scheme: dark)").matches;
		const next = dark ? "light" : "dark";
		remember(themeCookie, next);
		finishReveal.current = revealTheme(event.currentTarget, next);
	}

	return (
		<div className="preferences">
			<fieldset className="language-picker" data-selection={selection}>
				<legend className="sr-only">{t.language}</legend>
				<span className="language-marker" aria-hidden="true" ref={marker} />
				{(["vi", "en"] as const).map((lang) => (
					<button
						key={lang}
						type="button"
						lang={lang}
						aria-label={lang === "vi" ? "Tiếng Việt" : "English"}
						aria-pressed={lang === selection}
						onClick={() => switchLanguage(lang)}
					>
						{lang.toUpperCase()}
					</button>
				))}
			</fieldset>
			<button className="theme-toggle" type="button" onClick={toggleTheme}>
				<svg
					className="theme-glyph"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
				>
					<defs>
						<mask
							id={maskId}
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="24"
							height="24"
						>
							<rect width="24" height="24" fill="white" />
							<circle
								className="eclipse-cutout"
								cx="17"
								cy="8"
								r="6.5"
								fill="black"
							/>
						</mask>
					</defs>
					<circle
						cx="12"
						cy="12"
						r="6.5"
						fill="currentColor"
						mask={`url(#${maskId})`}
					/>
					<path
						className="sun-rays"
						d="M12 1.5v2 M12 20.5v2 M1.5 12h2 M20.5 12h2 M4.6 4.6 6 6 M18 18l1.4 1.4 M4.6 19.4 6 18 M18 6l1.4-1.4"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
				<span className="to-dark sr-only">{t.dark}</span>
				<span className="to-light sr-only">{t.light}</span>
			</button>
		</div>
	);
}
