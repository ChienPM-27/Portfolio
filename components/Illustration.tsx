const roads = [
	[-10, 10, 405, 160],
	[-20, 45, 410, 195],
	[-10, 75, 390, 220],
	[0, 120, 280, 220],
	[70, -15, 405, 99],
	[165, -10, 405, 63],
	[110, -10, -10, 220],
	[183, -10, 51, 240],
	[255, -10, 119, 240],
	[322, -10, 193, 240],
	[396, -10, 272, 240],
];
export const joints = (bend: number) => {
	const hand = [[184, 175]];
	for (let f = 0; f < 5; f++) {
		const baseX = 149 + f * 16,
			baseY = 135 - Math.sin((f * Math.PI) / 4) * 14;
		for (let j = 0; j < 4; j++) {
			const len = [12, 20, 22, 19, 15][f];
			hand.push([
				baseX +
					(f - 2) * j * (f === 0 ? 6 : 2) +
					Math.sin((bend * Math.PI) / 2) * j * j * 1.3,
				baseY - j * len * (1 - 0.83 * bend),
			]);
		}
	}
	return hand.map((point) => point.map((value) => Number(value.toFixed(3))));
};
export function Hand({ bend }: { bend: number }) {
	const pts = joints(bend);
	const fingers = Array.from({ length: 5 }, (_, i) => [
		0,
		1 + i * 4,
		2 + i * 4,
		3 + i * 4,
		4 + i * 4,
	]);
	return (
		<g>
			{[...fingers, [1, 5, 9, 13, 17]].map((ids) => (
				<polyline
					key={ids.join("-")}
					points={ids.map((i) => pts[i].join(",")).join(" ")}
					fill="none"
					stroke="#32624a"
					strokeWidth="2.4"
				/>
			))}
			{pts.map(([x, y], i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: Fixed anatomical landmark ID.
				<circle key={i} cx={x} cy={y} r="3.5" fill="#f6ffb6" stroke="#37543c" />
			))}
		</g>
	);
}
export function Illustration({ index }: { index: number }) {
	return (
		<svg
			viewBox="0 0 400 220"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden="true"
			className={`art art${index}`}
		>
			{index === 0 && (
				<>
					<image href="/chair.svg" x="45" y="5" width="310" height="210" />
					<path
						d="M102 55v-13h16m163 0h16v13m0 110v13h-16m-163 0h-16v-13"
						fill="none"
						stroke="#b88b6d"
					/>
				</>
			)}
			{index === 1 && (
				<>
					{roads.map((r) => (
						<line
							key={r.join()}
							x1={r[0]}
							y1={r[1]}
							x2={r[2]}
							y2={r[3]}
							stroke="#9ca8e5"
							strokeWidth="1.2"
						/>
					))}
					{[
						"36,151 84,122 124,145 198,85 251,101 320,51 374,63",
						"36,151 93,168 159,166 216,125 268,143 349,103",
					].map((s, i) => (
						<g key={s}>
							<polyline
								points={s}
								fill="none"
								stroke={i ? "#f1ffae" : "#fff"}
								strokeWidth="3"
							/>
							{s.split(" ").map((t) => (
								<circle
									key={t}
									cx={t.split(",")[0]}
									cy={t.split(",")[1]}
									r="5"
									fill="#3449b1"
									stroke={i ? "#f1ffae" : "#fff"}
									strokeWidth="2"
								/>
							))}
						</g>
					))}
				</>
			)}
			{index === 2 && (
				<>
					{Array.from({ length: 150 }, (_, i) => {
						const a = i * 2.4,
							r = 4.2 * Math.sqrt(i % 50),
							g = i % 3;
						return (
							<circle
								key={a}
								cx={([128, 201, 275][g] + r * Math.cos(a) * 1.8).toFixed(3)}
								cy={([134, 88, 136][g] + r * Math.sin(a)).toFixed(3)}
								r={2 + (i % 3) * 0.45}
								fill={["#d4c5ff", "#8471bc", "#f0a4ca"][g]}
							/>
						);
					})}
					<path d="M66 165L336 60" stroke="#c4abcd" strokeDasharray="4 6" />
				</>
			)}
			{index === 3 && <Hand bend={0.16} />}
			{index === 4 && (
				<g stroke="#814f1f" strokeWidth="2">
					<path d="M122 69L206 136L291 62" fill="none" />
					{[
						[122, 69, 21],
						[206, 136, 32],
						[291, 62, 21],
					].map(([x, y, r], i) => (
						<g key={x}>
							<circle
								cx={x}
								cy={y}
								r={r}
								fill={i === 1 ? "#f27041" : "#fff2bf"}
							/>
							<text
								x={x}
								y={y + 6}
								textAnchor="middle"
								stroke="none"
								fill="#38231b"
								fontSize="20"
							>
								{i === 1 ? "O" : "H"}
							</text>
						</g>
					))}
				</g>
			)}
		</svg>
	);
}
