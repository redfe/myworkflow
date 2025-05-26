import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_update_work(),
		breadCrumbs: [
			{ label: m.page_title_works(), href: '/works' },
			{ label: m.page_title_update_work() }
		]
	};
};
