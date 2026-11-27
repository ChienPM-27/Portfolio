import type { Locale } from "../lib/locale";

// Mean validation Macro-F1 from ALL_MEMBERS_FULL42_RESULTS.md, in H/B/F/HB/HF/BF/HBF order.
const validation = [
	["G0", [71.20, 9.28, 22.13, 71.20, 70.72, 20.32, 70.68]],
	["G-mean", [67.43, 8.84, 18.90, 67.27, 67.51, 19.60, 67.47]],
	["G-attn", [71.24, 8.80, 19.93, 71.30, 71.23, 22.07, 71.54]],
	["G-bi", [74.13, 9.82, 22.25, 74.42, 74.04, 22.34, 74.54]],
	["L0", [70.80, 7.63, 18.31, 71.53, 70.32, 20.09, 71.25]],
	["T0", [74.34, 6.22, 22.59, 75.45, 76.52, 23.16, 75.92]],
] as const;
const regions = ["H", "B", "F", "HB", "HF", "BF", "HBF"];
const finalScores = [
	["Macro-F1", 76.52, 0.56, 87.30, 0.77],
	["Top-1", 77.26, 0.82, 88.20, 1.07],
	["Top-3", 93.48, 0.18, 98.34, 0.52],
] as const;

export function AblationResults({ locale }: { locale: Locale }) {
	const vi = locale === "vi";
	const format = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	return (
		<section className="ablation-results">
			<h2>{vi ? "Kết quả ablation study" : "Ablation study results"}</h2>
			<p>{vi
				? "Với Transformer (T0), thêm landmark khuôn mặt vào đầu vào chỉ gồm bàn tay giúp Macro-F1 trên tập validation tăng từ 74,34% lên 76,52%. Đây là cấu hình có điểm cao nhất trong 42 cấu hình."
				: "For the Transformer (T0), adding face landmarks to hand landmarks raised validation Macro-F1 from 74.34% to 76.52%, the highest score across all 42 configurations."}</p>
			<div className="ablation-scroll" tabIndex={0} role="region" aria-label={vi ? "So sánh 42 cấu hình" : "Comparison of 42 configurations"}>
				<table>
					<caption>{vi ? "Macro-F1 trung bình trên tập validation (%)" : "Mean validation Macro-F1 (%)"}</caption>
					<thead><tr><th scope="col">{vi ? "Mô hình" : "Model"}</th>{regions.map(r => <th scope="col" key={r}>{r}</th>)}</tr></thead>
					<tbody>{validation.map(([model, scores]) => <tr key={model}>
						<th scope="row">{model}</th>{scores.map((score, i) => <td key={regions[i]}>
							{model === "T0" && regions[i] === "HF" ? <strong>{format.format(score)}</strong> : format.format(score)}
						</td>)}
					</tr>)}</tbody>
				</table>
			</div>
			<p>{vi ? "H = tay · B = thân trên · F = mặt. Mỗi cấu hình chạy với ba seed (42, 43, 44)." : "H = hands · B = upper body · F = face. Each configuration ran with three seeds (42, 43, 44)."}</p>
			<table>
				<caption>{vi ? "Transformer với tay và mặt · Trung bình ± độ lệch chuẩn (%)" : "Transformer with hands and face · Mean ± standard deviation (%)"}</caption>
				<thead><tr><th scope="col">{vi ? "Chỉ số" : "Metric"}</th><th scope="col">Validation</th><th scope="col">Test</th></tr></thead>
				<tbody>{finalScores.map(([metric, v, vs, t, ts]) => <tr key={metric}><th scope="row">{metric}</th>
					<td>{format.format(v)} ± {format.format(vs)}</td><td>{format.format(t)} ± {format.format(ts)}</td>
				</tr>)}</tbody>
			</table>
			<p>{vi ? "Tập test gồm 1.141 clip của 3 người ký, tách biệt với người ký trong tập train và validation." : "The test set contains 1,141 clips from three signers held out from training and validation."}</p>
		</section>
	);
}
