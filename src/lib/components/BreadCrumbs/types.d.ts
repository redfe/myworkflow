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
 * BreadCrumbs コンポーネントのプロパティ
 */
export interface BreadCrumbsProps {
	/** パンくずリストとして表示するアイテムの配列 */
	items: BreadCrumbItem[];
}
