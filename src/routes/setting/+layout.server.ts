import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * 設定ページのレイアウトロード関数
 * 設定ページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_setting(),
		breadCrumbs: []
	};
};
