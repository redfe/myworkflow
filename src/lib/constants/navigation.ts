import { HomeIcon, SmileIcon, BoxIcon, SettingsIcon, ListIcon } from '@lucide/svelte';
import { m } from '$lib/paraglide/messages';

/** サイドナビゲーションに表示するアイテムの配列 */
export const navs = [
	{ id: 'home', label: m.page_title_home(), href: '/', icon: HomeIcon },
	{ id: 'works', label: m.page_title_works(), href: '/works', icon: ListIcon },
	{ id: 'demo', label: m.page_title_demo(), href: '/demo', icon: SmileIcon },
	{ id: 'other', label: m.page_title_other(), href: '/other', icon: BoxIcon },
	{ id: 'setting', label: m.page_title_setting(), href: '/setting', icon: SettingsIcon }
] as const;

/** サイドナビゲーションに表示するアイテムの型 */
export type NavId = (typeof navs)[number]['id'];

/** アクティブなメニューアイテムに適用するCSSクラス */
export const activeMenuClasses = 'preset-filled-surface-400-600';

/** ホバー時に適用するメニューアイテムのCSSクラス */
export const hoverMenuClasses = 'hover:preset-filled-surface-100-900';
