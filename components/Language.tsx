"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type ReactNode,
} from "react";
import { getProjects } from "../data";
import { copy, languageCookie, type Locale } from "../lib/locale";

const Language = createContext<{
	locale: Locale;
	motion: boolean;
	changeLanguage: (next: Locale) => void;
} | null>(null);

export function LanguageProvider({
	initial,
	children,
}: {
	initial: Locale;
	children: ReactNode;
}) {
	const [settings, setSettings] = useState({ locale: initial, motion: false });
	const changeLanguage = useCallback((next: Locale) => {
		document.cookie = `${languageCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
		setSettings({
			locale: next,
			motion: !matchMedia("(prefers-reduced-motion: reduce)").matches,
		});
	}, []);
	useEffect(() => {
		if (!settings.motion) return;
		const timer = window.setTimeout(
			() => setSettings((current) => ({ ...current, motion: false })),
			1350,
		);
		return () => clearTimeout(timer);
	}, [settings]);
	useLayoutEffect(() => {
		document.documentElement.lang = settings.locale;
		const project = getProjects(settings.locale).find(
			(p) => location.pathname === "/du-an/" + p.slug,
		);
		document
			.querySelector('meta[name="description"]')
			?.setAttribute(
				"content",
				project?.summary ?? copy[settings.locale].description,
			);
	}, [settings.locale]);
	useEffect(() => {
		function restore(e: PageTransitionEvent) {
			if (!e.persisted) return;
			const english = document.cookie
				.split("; ")
				.includes(languageCookie + "=en");
			setSettings({ locale: english ? "en" : "vi", motion: false });
			const theme = document.cookie
				.split("; ")
				.find((pair) => pair.startsWith("portfolio_theme="))
				?.split("=")[1];
			if (theme === "light" || theme === "dark")
				document.documentElement.dataset.theme = theme;
		}
		window.addEventListener("pageshow", restore);
		return () => window.removeEventListener("pageshow", restore);
	}, []);
	return (
		<Language.Provider value={{ ...settings, changeLanguage }}>
			{children}
		</Language.Provider>
	);
}
export function useLanguage() {
	const language = useContext(Language);
	if (!language) throw new Error("LanguageProvider is required");
	return language;
}

export function Words({ text }: { text: string }) {
	const { motion, locale } = useLanguage();
	const ref = useRef<HTMLSpanElement>(null);
	const [shown, setShown] = useState(text);
	const [animate, setAnimate] = useState(false);
	useLayoutEffect(() => {
		if (!motion || !ref.current) {
			setShown(text);
			setAnimate(false);
			return;
		}
		if (shown === text) return;
		const rect = ref.current.getBoundingClientRect();
		const top = Math.max(0, rect.top);
		const delay = Math.min(
			800,
			320 * Math.log1p(top / Math.max(innerHeight * 0.55, 1)),
		);
		const visible = rect.bottom >= 0 && rect.top < innerHeight;
		const timer = window.setTimeout(() => {
			setAnimate(visible);
			setShown(text);
		}, delay);
		return () => clearTimeout(timer);
	}, [text, shown, motion]);
	const value = motion ? shown : text;
	return (
		<span
			className="localized-run"
			ref={ref}
			lang={value === text ? locale : locale === "en" ? "vi" : "en"}
		>
			{motion && animate
				? Array.from(value.matchAll(/\S+\s*/g), (word, i) => (
						<span
							key={value + "-" + word.index}
							className="localized-word"
							style={
								{
									"--word-delay": Math.min(i * 18, 290) + "ms",
								} as CSSProperties
							}
						>
							{word[0]}
						</span>
					))
				: value}
		</span>
	);
}
