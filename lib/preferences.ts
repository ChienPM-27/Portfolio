import { cache } from "react";
import { cookies } from "next/headers";
import { languageCookie, themeCookie, type Locale } from "./locale";

export const getPreferences = cache(async () => {
	const jar = await cookies();
	const locale: Locale = jar.get(languageCookie)?.value === "en" ? "en" : "vi";
	const value = jar.get(themeCookie)?.value;
	const theme = value === "dark" || value === "light" ? value : undefined;
	return { locale, theme };
});
