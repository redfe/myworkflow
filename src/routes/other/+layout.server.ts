import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * その他ページのレイアウトロード関数
 * その他ページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_other(),
		breadCrumbs: [{ label: m.page_title_home(), href: '/' }]
	};
};
