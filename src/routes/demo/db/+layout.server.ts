import { m } from '$lib/paraglide/messages';

export function load() {
	return {
		title: m.title_db(),
		breadCrumbs: [
			{ label: 'ホーム', href: '/' },
			{ label: 'デモ', href: '/demo' },
			{ label: 'データベース', href: '/demo/db' }
		]
	};
}
