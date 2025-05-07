import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * デモページのレイアウトロード関数
 * デモページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_demo(),
		breadCrumbs: []
	};
};
