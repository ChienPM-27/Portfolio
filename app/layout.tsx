import type { Metadata } from "next";
import { getPreferences } from "../lib/preferences";
import { copy } from "../lib/locale";
import { LanguageProvider } from "../components/Language";
import "./portfolio.css";

export async function generateMetadata(): Promise<Metadata> {
	const { locale } = await getPreferences();
	return {
		title: {
			default: "Phạm Minh Chiến — AI Engineer Intern",
			template: "%s · Phạm Minh Chiến",
		},
		description: copy[locale].description,
	};
}
export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { locale, theme } = await getPreferences();
	return (
		<html lang={locale} data-theme={theme}>
			<body>
				<LanguageProvider initial={locale}>{children}</LanguageProvider>
			</body>
		</html>
	);
}
