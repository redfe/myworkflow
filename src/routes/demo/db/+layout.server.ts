import { m } from '$lib/paraglide/messages';

export function load() {
	return {
		title: m.page_title_db(),
		breadCrumbs: [
			{ label: m.page_title_home(), href: '/' },
			{ label: m.page_title_demo(), href: '/demo' }
		]
	};
}
