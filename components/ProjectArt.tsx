import { Hand } from "./Illustration";
import type { Project } from "../data";

export function ProjectArt({
	project,
	bend = 0.16,
}: {
	project: Project;
	bend?: number;
}) {
	const kind = project.art;
	return (
		<div className={`plate plate-${kind}`} aria-hidden="true">
			<svg
				aria-hidden="true"
				viewBox="0 0 540 350"
				preserveAspectRatio="xMidYMid meet"
			>
				{kind === "memory" && (
					<g transform="translate(40 39)">
						{Array.from({ length: 19 }, (_, i) => {
							const inset = i * 2.8;
							return (
								<g
									key={inset}
									transform={`matrix(0.91 -0.36 0.67 0.58 ${inset - 7} ${133 - inset * 1.17})`}
								>
									<rect
										x="22"
										y="34"
										width="297"
										height="179"
										rx="13"
										fill={i === 18 ? "#f06b3d" : "#2c3028"}
										stroke={i === 18 ? "#ffb28d" : "#a9ae90"}
										strokeWidth="1.55"
									/>
									{i === 18 && (
										<g fill="none" stroke="#552e21" strokeWidth="1.8">
											<rect x="42" y="54" width="257" height="139" rx="5" />
											{Array.from(
												{ length: 19 },
												(_, j) =>
													`M${48 + j * 3} 161 Q${83 + j * 5} ${26 + j} ${155 + j * 3} ${124 + j * 2} T292 ${87 + j * 3}`,
											).map((d) => (
												<path key={d} d={d} />
											))}
										</g>
									)}
								</g>
							);
						})}
					</g>
				)}
				{kind === "gesture" && (
					<g transform="translate(0 13)">
						{[0.64, 0.32, 0].map((offset, i) => (
							<g
								key={offset}
								opacity={0.22 + i * 0.36}
								transform={`translate(${-183 + 32 * i} -68) scale(2.05)`}
							>
								<Hand bend={Math.min(1, bend + offset)} />
							</g>
						))}
					</g>
				)}
				{kind === "coffee" && (
					<g transform="rotate(-10 270 175)">
						<path
							fill="#dcaf75"
							d="M159 77h232l-17 199-10 8-9-8-11 8-11-8-11 8-11-8-10 8-12-8-10 8-11-8-11 8-11-8-11 8-11-8-11 8-11-8-11 8-11-8z"
						/>
						<path
							fill="#fff2d5"
							d="M150 66h232l-17 199-10 8-9-8-11 8-11-8-11 8-11-8-10 8-12-8-10 8-11-8-11 8-11-8-11 8-11-8-11 8-11-8-11 8-11-8z"
						/>
						<g fill="#482d21">
							<text x="176" y="109" fontSize="29" fontWeight="700">
								Brew-Lite
							</text>
							<path d="M175 125h171v2H175zm0 24h116v5H175zm142 0h26v5h-26zm-143 19h85v5h-85zm129 0h39v5h-39z" />
							{Array.from({ length: 38 }, (_, i) => ({
								x: 175 + i * 4.15,
								width: [1.6, 3, 1, 2.5][i % 4],
							})).map((bar) => (
								<rect
									key={bar.x}
									x={bar.x}
									y="201"
									width={bar.width}
									height="33"
								/>
							))}
						</g>
					</g>
				)}
			</svg>
		</div>
	);
}
