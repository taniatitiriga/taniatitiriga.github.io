const mdModules = import.meta.glob('./**/*.md', { eager: true });
const rawModules = import.meta.glob('./**/*.md', { as: 'raw', eager: true });

export function load() {
	const projects = Object.entries(mdModules).map(([path, mod]) => {
		const slug = path.split('/')[1];
		const excerpt =
			mod.metadata?.description ??
			(rawModules[path] || '')
				.split('\n')
				.map((line) => line.trim())
				.find((line) => line.length > 0 && !line.startsWith('#')) ?? '';
		return { slug, title: mod.metadata?.title ?? slug, excerpt };
	});
	return { projects };
}