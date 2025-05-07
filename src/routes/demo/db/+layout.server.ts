import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * データベースデモページのレイアウトロード関数
 * データベースデモページのタイトルとパンくずリストを設定します
 */
export const load: LayoutServerLoad = () => {
	return {
		title: m.page_title_db(),
		breadCrumbs: [{ label: m.page_title_demo(), href: '/demo' }, { label: m.page_title_db() }]
	};
};
