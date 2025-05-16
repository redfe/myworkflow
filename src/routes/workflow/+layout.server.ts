import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * ワークフローページのレイアウトロード関数
 * ワークフローページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_workflow(),
		breadCrumbs: []
	};
};
