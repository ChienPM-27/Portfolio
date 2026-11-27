import type { Locale } from "./locale";

export const templates = {
	vi: {
		recruit: {
			title: "Tuyển dụng",
			message:
				"Chào Chiến,\n\nMình đang tuyển vị trí … tại … và muốn trao đổi với bạn về cơ hội này. Bạn có thể sắp xếp một buổi trò chuyện vào … được không?",
		},
		project: {
			title: "Hỏi về dự án",
			message:
				"Chào Chiến,\n\nMình vừa xem dự án {project} và muốn tìm hiểu thêm về … Bạn có thể chia sẻ cách bạn triển khai phần này hoặc cho mình xem demo được không?",
		},
		collab: {
			title: "Hợp tác",
			message:
				"Chào Chiến,\n\nMình đang thực hiện … và muốn mời bạn cùng tham gia. Phần mình muốn trao đổi là … Thời gian dự kiến là …",
		},
	},
	en: {
		recruit: {
			title: "Recruitment",
			message:
				"Hi Chiến,\n\nI’m hiring for a … role at … and would love to discuss the opportunity with you. Would you have time for a call on …?",
		},
		project: {
			title: "Project question",
			message:
				"Hi Chiến,\n\nI just read about your project {project} and would like to learn more about … Could you share how you built that part or show me a demo?",
		},
		collab: {
			title: "Collaboration",
			message:
				"Hi Chiến,\n\nI’m working on … and would love to collaborate. I’d like to talk about … Our tentative timeline is …",
		},
	},
};
export type Topic = keyof typeof templates.vi;
export interface Inquiry {
	name: string;
	email: string;
	topic: Topic;
	message: string;
}
export function isTopic(value: unknown): value is Topic {
	return typeof value === "string" && Object.hasOwn(templates.vi, value);
}
export function mailContent(data: Inquiry, locale: Locale = "vi") {
	return {
		subject: `[Portfolio] ${templates[locale][data.topic].title} · ${data.name.trim()}`,
		text: `${data.message.trim()}\n\n${data.name.trim()}\n${data.email.trim()}`,
	};
}
