import type { HTMLAnchorAttributes } from 'svelte/elements';

/**
 * パンくずリストの各アイテムを表すインターフェース
 */
export interface BreadCrumbItem {
	/** アイテムに表示されるテキスト */
	label: string;
	/** アイテムのリンク先URL */
	href?: string;
}

/**
 * Link コンポーネントのプロパティ
 */
export type LinkProps = HTMLAnchorAttributes;
