import { browser } from '$app/environment';

const key = 'sideMenu.isExpanded';

export function getExpanded() {
	if (!browser) return;
	const item = localStorage?.getItem(key);
	if (item) {
		return item === 'true';
	}
	return undefined;
}

export function setExpanded(isExpanded: boolean) {
	// サーバーサイドでも機能するようにcookie に設定する
	if (!browser) return;
	console.log('setExpanded', isExpanded);
	localStorage?.setItem(key, isExpanded.toString());
}
