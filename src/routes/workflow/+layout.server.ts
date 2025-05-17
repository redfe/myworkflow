import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_workflow(),
		breadCrumbs: []
	};
};
