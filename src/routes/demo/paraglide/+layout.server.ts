import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * 多言語化デモページのレイアウトロード関数
 * 多言語化デモページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_i18n(),
		breadCrumbs: [
			{ label: m.page_title_home(), href: '/' },
			{ label: m.page_title_demo(), href: '/demo' }
		]
	};
};
