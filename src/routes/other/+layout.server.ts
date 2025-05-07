import { m } from '$lib/paraglide/messages';

export function load() {
	return {
		title: m.page_title_other(),
		breadCrumbs: [{ label: m.page_title_home(), href: '/' }]
	};
}
