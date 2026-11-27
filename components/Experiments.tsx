"use client";
import { useState } from "react";
import { Hand } from "./Illustration";
import { Viewer } from "./Viewer";
export const stops = [
	[48, 124],
	[112, 49],
	[207, 152],
	[274, 57],
	[348, 119],
];
function route(deadline: number) {
	let best = Infinity,
		path: number[] = [];
	function visit(
		ids: number[],
		remaining: number[],
		time: number,
		length: number,
	) {
		const [x, y] = stops[ids[ids.length - 1]];
		if (!remaining.length) {
			const cost = length + Math.hypot(x - stops[0][0], y - stops[0][1]);
			if (cost < best) {
				best = cost;
				path = [...ids, 0];
			}
			return;
		}
		for (const id of remaining) {
			const dist = Math.hypot(x - stops[id][0], y - stops[id][1]);
			const arrival = Math.max(id === 1 ? 20 : 0, time + dist / 5);
			if (arrival <= (id === 2 ? deadline : 170))
				visit(
					[...ids, id],
					remaining.filter((n) => n !== id),
					arrival + 2,
					length + dist,
				);
		}
	}
	visit([0], [1, 2, 3, 4], 0, 0);
	return { best, path };
}
export function Experiments({ index }: { index: number }) {
	const [value, setValue] = useState([0, 70, 4, 10, 20][index]);
	if (index === 0) return <Viewer />;
	const labels = [
		"",
		"Hạn giao tại B",
		"Số mẫu tích cực bị bỏ sót",
		"Khung hình",
		"Thời gian sau khi kéo",
	];
	const max = [0, 150, 20, 60, 100][index];
	let display: React.ReactNode, readout: string;
	if (index === 1) {
		const { best, path } = route(value);
		display = (
			<svg
				viewBox="0 0 400 220"
				role="img"
				aria-label="Tuyến giữa kho và bốn điểm giao"
			>
				<polyline
					points={path.map((i) => stops[i].join(",")).join(" ")}
					stroke="#ffe2ab"
					strokeWidth="3"
					fill="none"
				/>
				{stops.map(([x, y], i) => (
					<g key={x}>
						<circle cx={x} cy={y} r="8" fill="#ff8151" />
						<text x={x} y={y - 17} textAnchor="middle">
							{["Kho", "A", "B", "C", "D"][i]}
						</text>
					</g>
				))}
			</svg>
		);
		readout = path.length
			? path.map((i) => ["Kho", "A", "B", "C", "D"][i]).join(" → ") +
				" · " +
				Math.round(best) +
				" đơn vị"
			: "Không có tuyến khả thi trong khung giờ này.";
	} else if (index === 2) {
		const tp = 20 - value,
			tn = 15,
			fp = 5,
			fn = value;
		const f1 =
			((2 * tp) / (2 * tp + fp + fn) + (2 * tn) / (2 * tn + fp + fn)) / 2;
		display = (
			<table>
				<caption>Ma trận nhầm lẫn · 40 phản hồi minh họa</caption>
				<thead>
					<tr>
						<th>Thực tế ↓</th>
						<th>Dự đoán +</th>
						<th>Dự đoán −</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Tích cực</th>
						<td>{tp}</td>
						<td>{fn}</td>
					</tr>
					<tr>
						<th>Tiêu cực</th>
						<td>{fp}</td>
						<td>{tn}</td>
					</tr>
				</tbody>
			</table>
		);
		readout = `Macro-F1 = ${f1.toFixed(3)}`;
	} else if (index === 3) {
		display = (
			<svg
				className="hand"
				viewBox="0 0 400 220"
				role="img"
				aria-label="Bàn tay theo khung hình"
			>
				<Hand bend={(1 - Math.cos((value / 60) * Math.PI * 2)) / 2} />
			</svg>
		);
		readout = `21 landmark · Khung ${value} / 60`;
	} else {
		const t = value / 10,
			d = Number((36 * Math.exp(-0.28 * t) * Math.cos(t * 3)).toFixed(3));
		display = (
			<svg
				viewBox="0 0 400 220"
				role="img"
				aria-label="Dao động của hai liên kết O–H"
			>
				<path
					d={`M${130 - d} ${83 - d / 2} L200 140 L${270 + d} ${83 - d / 2}`}
					stroke="#ffca82"
					strokeWidth="4"
					fill="none"
				/>
				{[
					[130 - d, 83 - d / 2],
					[200, 140],
					[270 + d, 83 - d / 2],
				].map(([x, y], i) => (
					<g key={["H-left", "O", "H-right"][i]}>
						<circle
							cx={x}
							cy={y}
							r={i === 1 ? 29 : 19}
							fill={i === 1 ? "#ed764d" : "#ece9cc"}
						/>
						<text
							x={x}
							y={y + 6}
							textAnchor="middle"
							style={{ fill: "#252622" }}
						>
							{i === 1 ? "O" : "H"}
						</text>
					</g>
				))}
			</svg>
		);
		readout = `Độ lệch khỏi cân bằng ${d.toFixed(1)} đơn vị`;
	}
	return (
		<div className="experiment">
			<div className="expvisual">{display}</div>
			<div className="expctrl">
				<label htmlFor="param">
					{labels[index]} <output>{value}</output>
				</label>
				<input
					id="param"
					type="range"
					min="0"
					max={max}
					value={value}
					onChange={(e) => setValue(Number(e.target.value))}
				/>
				<p aria-live="polite">{readout}</p>
			</div>
		</div>
	);
}
