import type { LayoutServerLoad } from './$types';
import { m } from '$lib/paraglide/messages';

/**
 * ルートレイアウトのサーバーサイドロード関数
 * ページのタイトルとパンくずリストの初期値を設定します
 */
export const load: LayoutServerLoad = (event) => {
	const headers = event.request.headers;
	return {
		title: m.page_title_home(),
		breadCrumbs: [],
		userId: event.locals.userId,
		headers: Array.from(headers.keys())
	};
};
