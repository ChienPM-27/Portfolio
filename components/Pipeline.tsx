"use client";
import { useEffect, useRef, useState } from "react";
const stages = [
	[
		"Tách chủ thể",
		"Mặt nạ chủ thể",
		"rembg hoặc SAM2 tách nền để giữ vùng vật thể. Mặt nạ xác định những pixel thuộc chiếc ghế trong ảnh nguồn.",
	],
	[
		"Ước lượng hình học",
		"Point cloud thô",
		"ResNet50 mã hóa tín hiệu ảnh. Bottleneck Adapter điều chỉnh đặc trưng học trên Pix3D để dự đoán cấu trúc không gian ban đầu.",
	],
	[
		"Tinh chỉnh hình dạng",
		"Bề mặt 3D",
		"Các điểm lấy mẫu dày hơn mô tả độ cong của lưng và mặt ghế. Hunyuan3D-2 tham gia giai đoạn dựng hình chi tiết.",
	],
	[
		"Đưa mô hình đến người dùng",
		"Ứng dụng di động",
		"Client Expo React Native gửi ảnh đến FastAPI. GPU trên GCP thực hiện phần tính toán và trả kết quả về thiết bị.",
	],
] as const;
export function Pipeline() {
	const root = useRef<HTMLDivElement>(null),
		[active, setActive] = useState(0);
	useEffect(() => {
		const nodes = root.current?.querySelectorAll("article");
		if (!nodes?.length) return;
		function update() {
			if (!nodes) return;
			let nearest = 0,
				min = Infinity;
			nodes.forEach((n, i) => {
				const box = n.getBoundingClientRect();
				const distance = Math.abs(
					box.top + box.height * 0.5 - innerHeight * 0.5,
				);
				if (distance < min) {
					min = distance;
					nearest = i;
				}
			});
			setActive(nearest);
		}
		const observer = new IntersectionObserver(update, {
			rootMargin: "-22% 0px -22% 0px",
			threshold: [0, 0.25, 0.5, 0.75, 1],
		});
		nodes.forEach((n) => {
			observer.observe(n);
		});
		return () => observer.disconnect();
	}, []);
	return (
		<section className="pipeline" ref={root}>
			<h2>Từ ảnh đến vật thể</h2>
			<div className="pipegrid">
				<figure data-stage={active}>
					<div className="pipeimage" />
					<figcaption>{stages[active][1]}</figcaption>
				</figure>
				<div>
					{stages.map(([title, , body], i) => (
						<article key={title} data-active={i === active}>
							<h3>{title}</h3>
							<p>{body}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

