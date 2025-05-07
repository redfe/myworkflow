import { m } from '$lib/paraglide/messages';

export function load() {
	return {
		title: m.page_title_i18n(),
		breadCrumbs: [
			{ label: m.page_title_home(), href: '/' },
			{ label: m.page_title_demo(), href: '/demo' }
		]
	};
}
