import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * 設定ページのレイアウトロード関数
 * 設定ページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_add_work(),
		breadCrumbs: [
			{ label: m.page_title_works(), href: '/works' },
			{ label: m.page_title_add_work() }
		]
	};
};
