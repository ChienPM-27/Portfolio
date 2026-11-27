export type Point = readonly [number, number, number];
type Sample = { point: Point; tone: number };
export const chair: Sample[] = [];

function sheet(
	rows: number,
	cols: number,
	surface: (u: number, v: number) => Point,
	bias = 0,
) {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const u = j / (cols - 1),
				v = i / (rows - 1);
			const edge = j === 0 || j === cols - 1 || i === 0 || i === rows - 1;
			chair.push({
				point: surface(u, v),
				tone: edge
					? 3
					: Math.min(3, Math.floor((u * 0.45 + (1 - v) * 0.35 + bias) * 4)),
			});
		}
	}
}

// Mặt ghế và lưng ghế uốn cong theo hai trục.
sheet(
	36,
	55,
	(u, v) => {
		const x = 2 * u - 1,
			z = 2 * v - 1;
		return [
			x * (0.92 - 0.14 * z * z),
			0.04 + 0.09 * x * x + 0.05 * z * z,
			z * 0.78,
		];
	},
	0.12,
);
sheet(
	44,
	55,
	(u, v) => {
		const x = 2 * u - 1;
		return [
			x * (0.72 + 0.14 * Math.sin(v * Math.PI) - 0.08 * v),
			0.15 + v * 1.48 - 0.12 * x * x * v,
			-0.66 - 0.22 * v + 0.22 * x * x + 0.045 * Math.sin(v * Math.PI),
		];
	},
	0.14,
);
function rod(a: Point, b: Point, r: number, n: number) {
	sheet(
		n,
		6,
		(u, v) => [
			a[0] + (b[0] - a[0]) * v + r * Math.cos(u * 2 * Math.PI),
			a[1] + (b[1] - a[1]) * v,
			a[2] + (b[2] - a[2]) * v + r * Math.sin(u * 2 * Math.PI),
		],
		0.18,
	);
}
for (const x of [-1, 1])
	for (const z of [-1, 1]) {
		rod([x * 0.64, -0.02, z * 0.51], [x * 0.84, -1.41, z * 0.68], 0.038, 29);
		rod([x * 0.77, -0.94, z * 0.62], [-x * 0.6, -0.07, z * 0.49], 0.012, 20);
	}
export const colors = ["#9f492c", "#e26d39", "#ffa159", "#ffcf8d"];
export function project(
	[x, y, z]: Point,
	angle: number,
	tilt: number,
): [number, number] {
	const depth = x * Math.sin(angle) + z * Math.cos(angle);
	return [
		x * Math.cos(angle) - z * Math.sin(angle),
		-y * Math.cos(tilt) + depth * Math.sin(tilt),
	];
}
