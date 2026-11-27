import { ProjectStory } from "../../../components/ProjectStory";
import { notFound } from "next/navigation";
import { getProjects } from "../../../data";
import { getPreferences } from "../../../lib/preferences";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
	const [{ slug }, { locale }] = await Promise.all([params, getPreferences()]);
	const projects = getProjects(locale);
	const p = projects.find((project) => project.slug === slug);
	return { title: p?.title, description: p?.summary };
}
export default async function Study({ params }: Props) {
	const { slug } = await params;
	if (!getProjects("vi").some((p) => p.slug === slug)) notFound();
	return <ProjectStory slug={slug} />;
}
