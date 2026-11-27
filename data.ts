import type { Locale } from "./lib/locale";

export type ProjectMedia =
	| { kind: "image"; src: string; description: string }
	| {
			kind: "video";
			src: string;
			description: string;
			poster?: string;
			captions?: string;
	  };

export interface Project {
	slug: string;
	title: string;
	category: string;
	art: "memory" | "gesture" | "coffee";
	question: string;
	summary: string;
	method: string;
	outcome: string;
	stack: string[];
	skill: string;
	proof: string;
	repo?: string;
	report?: string;
	website?: string;
	media?: ProjectMedia;
	role?: string;
}

export const projects: Project[] = [
	{
		slug: "remora-production",
		title: "Remora-Production",
		role: "Vai trò của tôi · Trưởng nhóm, phát triển full-stack và DevOps",
		media: {
			kind: "video",
			src: "/remora/demo.mp4",
			poster: "/remora/poster.jpg",
			captions: "/remora/demo.vi.vtt",
			description: "Demo Remora · 1 phút 22 giây · Tiếng Việt",
		},
		category: "Android & AI",
		art: "memory",
		question: "Tìm lại một ảnh chỉ bằng điều mình còn nhớ?",
		summary:
			"Một kho ký ức cá nhân trên Android. Lưu ảnh chụp màn hình hôm nay, tìm lại bằng ý nghĩa hoặc hỏi về một chi tiết trong ảnh sau này.",
		method:
			"Ảnh, ghi chú và lịch sử trò chuyện nằm trong Room trên điện thoại. Khi người dùng chọn phân tích, Ktor kết nối ứng dụng với Gemini. Tìm kiếm từ khóa vẫn hoạt động ngoại tuyến.",
		outcome:
			"Mỗi gợi nhớ chỉ ra ảnh nguồn và giải thích vì sao hai ảnh liên quan. Khi hỏi đáp, người dùng có thể mở ảnh được trích dẫn để tự kiểm tra câu trả lời.",
		stack: ["Kotlin", "Jetpack Compose", "Room", "Ktor", "Gemini"],
		skill: "Android & truy xuất theo ngữ cảnh",
		proof:
			"Kết hợp lưu trữ cục bộ, tìm kiếm ngữ nghĩa và hỏi đáp có trích dẫn trong cùng một ứng dụng.",
	},
	{
		slug: "sign-language",
		title: "SignlanguageRecognition",
		media: {
			kind: "video",
			src: "/sign-language/demo.mp4",
			poster: "/sign-language/poster.jpg",
			description: "Demo nhận diện ký hiệu ASL qua webcam",
		},
		category: "Thị giác máy tính",
		art: "gesture",
		question: "Một cử chỉ được nhận ra từ đâu?",
		summary:
			"Từ chuỗi tọa độ tay và khuôn mặt, mô hình học cách phân biệt 20 ký hiệu rời trong ngôn ngữ ký hiệu Mỹ (ASL).",
		method:
			"Pipeline chuẩn hóa chuỗi landmark MediaPipe về 32 khung hình. Thí nghiệm so sánh sáu kiến trúc với bảy tổ hợp vùng cơ thể, mỗi cấu hình chạy ba seed. Người ký được tách riêng giữa các tập dữ liệu.",
		outcome:
			"Transformer dùng landmark tay và mặt đạt Macro-F1 trung bình 87,30% trên 1.141 clip kiểm thử. Demo webcam cho phép quan sát dự đoán trực tiếp.",
		stack: ["Python", "PyTorch", "MediaPipe", "Transformer"],
		skill: "Thực nghiệm & đánh giá mô hình",
		proof:
			"Thiết kế phép so sánh 42 cấu hình và đánh giá khả năng nhận diện trên những người ký chưa xuất hiện trong tập huấn luyện.",
		repo: "https://github.com/ChienPM-27/SignLanguageReconition_ML",
		report:
			"https://github.com/ChienPM-27/SignLanguageReconition_ML/blob/main/reports/ablation-study-v3/FULL42_HANDOFF.md",
	},
	{
		slug: "brew-lite",
		title: "Brew-Lite",
		website: "https://brew-lite.vercel.app/",
		media: {
			kind: "image",
			src: "/brew-lite/home.jpg",
			description: "Trang chủ Brew-Lite với lối vào thực đơn và giỏ hàng.",
		},
		category: "Ứng dụng web",
		art: "coffee",
		question: "Điều gì xảy ra sau một lần bấm đặt cà phê?",
		summary:
			"Một luồng đặt đồ uống trên điện thoại, từ chọn món và tùy chỉnh ly đến thanh toán và theo dõi đơn hàng.",
		method:
			"Giao diện Next.js gửi đơn tới API NestJS. Prisma kết nối với PostgreSQL để lưu món, tồn kho và trạng thái đơn. Luồng thanh toán được tích hợp với VNPay Sandbox.",
		outcome:
			"GitHub Actions chạy kiểm thử trước khi triển khai. Bộ kiểm thử Playwright đi qua luồng đặt hàng, trong khi tài liệu truy vết liên kết 22 yêu cầu chức năng với phần triển khai tương ứng.",
		stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "GitHub Actions"],
		skill: "Full-stack & triển khai",
		proof:
			"Nối giao diện đặt món với API, cơ sở dữ liệu và thanh toán. Kiểm tra luồng checkout bằng Playwright trong quy trình CI/CD.",
		repo: "https://github.com/ChienPM-27/BrewLite_assignment2",
	},
];

export const contact = {
	email: "pminhchien2006@gmail.com",
	github: "https://github.com/ChienPM-27",
};

type ProjectStory = Pick<
	Project,
	"category" | "question" | "summary" | "method" | "outcome" | "skill" | "proof" | "role"
>;
const englishStories: Record<Project["art"], ProjectStory> = {
	memory: {
		role: "My role · Team lead, full-stack developer and DevOps engineer",
		category: "Android & AI",
		question: "Can you find a screenshot from just what you remember?",
		summary:
			"A personal memory library for Android. Save a screenshot today, then find it by meaning or ask about a detail in it later.",
		method:
			"Room keeps images, notes and chat history on the phone. When someone chooses to analyze an image, Ktor connects the app to Gemini. Keyword search also works offline.",
		outcome:
			"Each suggested memory links back to the source image and explains how the two images relate. In a chat, readers can open the cited image to check the answer for themselves.",
		skill: "Android & contextual retrieval",
		proof:
			"Combined on-device storage, semantic search and answers with citations in one Android app.",
	},
	gesture: {
		category: "Computer vision",
		question: "What makes a gesture recognizable?",
		summary:
			"The model learns to distinguish 20 isolated American Sign Language (ASL) signs from sequences of hand and face coordinates.",
		method:
			"The pipeline resamples MediaPipe landmark sequences to 32 frames. The study compares six architectures across seven combinations of body regions, with three seeds per configuration. Each signer appears in only one data split.",
		outcome:
			"A Transformer using hand and face landmarks achieved a mean macro F1 of 87.30% on 1,141 test clips. A webcam demo shows the model’s predictions live.",
		skill: "Model experimentation & evaluation",
		proof:
			"Designed a comparison of 42 configurations and evaluated recognition on signers the models had never seen during training.",
	},
	coffee: {
		category: "Web applications",
		question: "What happens after you tap to order a coffee?",
		summary:
			"A mobile ordering flow that takes a drink from menu selection and customization through payment and order tracking.",
		method:
			"The Next.js frontend sends orders to a NestJS API. Prisma connects to PostgreSQL to store menu items, inventory and order status. Checkout integrates with the VNPay sandbox.",
		outcome:
			"GitHub Actions runs tests before deployment. Playwright covers the ordering flow, and a traceability matrix links 22 functional requirements to their implementations.",
		skill: "Full-stack development & deployment",
		proof:
			"Connected the ordering interface to the API, database and payment service. Tested checkout with Playwright as part of CI/CD.",
	},
};
const englishProjects = projects.map((p) => ({
	...p,
	...englishStories[p.art],
	...(p.art === "gesture" && p.media && {
		media: { ...p.media, description: "ASL sign recognition with a webcam" },
	}),
	...(p.slug === "remora-production" && p.media && {
		media: { ...p.media, description: "Remora product demo · 1 min 22 sec · Vietnamese" },
	}),
	...(p.slug === "brew-lite" && p.media && {
		media: { ...p.media, description: "Brew-Lite homepage with links to the menu and cart." },
	}),
}));
export function getProjects(locale: Locale) {
	return locale === "vi" ? projects : englishProjects;
}
