type Theme = "light" | "dark";

export function revealTheme(button: HTMLButtonElement, next: Theme) {
	const root = document.documentElement;
	const motion = matchMedia("(prefers-reduced-motion: reduce)");
	if (motion.matches) {
		root.dataset.theme = next;
		return;
	}

	const rect = button.getBoundingClientRect();
	root.style.setProperty("--reveal-x", `${rect.left + rect.width / 2}px`);
	root.style.setProperty("--reveal-y", `${rect.top + rect.height / 2}px`);
	root.dataset.themeReveal = "";

	let finished = false;
	let transition: ViewTransition | undefined;
	let veil: HTMLDivElement | undefined;

	function apply() {
		if (!finished) root.dataset.theme = next;
	}
	function finish() {
		if (finished) return;
		apply();
		finished = true;
		motion.removeEventListener("change", cancel);
		window.removeEventListener("scroll", cancel);
		veil?.remove();
		delete root.dataset.themeReveal;
		root.style.removeProperty("--reveal-x");
		root.style.removeProperty("--reveal-y");
	}
	function cancel() {
		if (finished) return;
		transition?.skipTransition();
		finish();
	}

	motion.addEventListener("change", cancel);
	window.addEventListener("scroll", cancel, { passive: true });
	if (typeof document.startViewTransition === "function") {
		transition = document.startViewTransition(() => {
			if (finished) return;
			root.dataset.themeReveal = "live";
			apply();
		});
		// Skipping an in-flight capture rejects ready, but still runs the update.
		transition.ready.catch(() => {});
		transition.finished.then(finish, finish);
	} else {
		// Cover the old palette before swapping it, then uncover the live page.
		veil = document.createElement("div");
		veil.className = "theme-veil";
		veil.style.colorScheme = next;
		veil.setAttribute("aria-hidden", "true");
		document.body.append(veil);
		const cover = veil.getAnimations()[0];
		if (!cover) finish();
		else
			cover.finished.then(() => {
				if (finished || !veil) return;
				apply();
				const fade = veil.animate([{ opacity: 1 }, { opacity: 0 }], {
					duration: 190,
					easing: "ease-out",
					fill: "forwards",
				});
				fade.finished.then(finish, finish);
			}, finish);
	}
	return cancel;
}
