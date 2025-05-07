import { HomeIcon, SmileIcon, BoxIcon, SettingsIcon } from '@lucide/svelte';
import { m } from '$lib/paraglide/messages';

/** サイドナビゲーションに表示するアイテムの配列 */
export const navs = [
	{ id: 'home', label: m.page_title_home(), href: '/', icon: HomeIcon },
	{ id: 'demo', label: m.page_title_demo(), href: '/demo', icon: SmileIcon },
	{ id: 'other', label: m.page_title_other(), href: '/other', icon: BoxIcon },
	{ id: 'setting', label: m.page_title_setting(), href: '/setting', icon: SettingsIcon }
] as const;

/** サイドナビゲーションに表示するアイテムの型 */
export type NavId = (typeof navs)[number]['id'];

/** アクティブなメニューアイテムに適用するCSSクラス */
export const activeMenuClasses = 'preset-filled-surface-500';
