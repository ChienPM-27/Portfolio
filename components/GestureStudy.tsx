"use client";
import { copy, type Locale } from "../lib/locale";
import { useState } from "react";
import type { Project } from "../data";
import { ProjectArt } from "./ProjectArt";

export function GestureStudy({
	project,
	locale,
}: {
	project: Project;
	locale: Locale;
}) {
	const [frame, setFrame] = useState(10);
	const bend = (1 - Math.cos((frame * Math.PI) / 30)) / 2;
	return (
		<figure>
			<ProjectArt project={project} bend={bend} />
			<figcaption className="gesture-control">
				<label htmlFor="frame">{copy[locale].hand}</label>
				<input
					id="frame"
					type="range"
					min="0"
					max="60"
					value={frame}
					onChange={(e) => setFrame(Number(e.target.value))}
				/>
				<output htmlFor="frame">
					{copy[locale].frame} {frame} / 60
				</output>
			</figcaption>
		</figure>
	);
}
