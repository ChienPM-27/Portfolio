export function ProjectTitle({ title }: { title: string }) {
	const parts = title.split(/(?<=[a-z])(?=[A-Z])/);
	return parts.map((part, i) => (
		<span key={part}>
			{i > 0 && <wbr />}
			{part}
		</span>
	));
}
