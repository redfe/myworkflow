import type { NavId } from '$lib/constants/navigation';

/**
 * サイドナビゲーションコンポーネントのプロパティ
 */
export interface SideNavigationProps {
	/**
	 * サイドナビゲーションの展開状態
	 * デフォルトは false
	 */
	isExpanded?: boolean;

	/** 現在選択されているナビゲーションアイテムのID */
	navId?: NavId;

	/** ナビゲーションアイテムが選択された時のコールバック */
	onNavValueChange: (value: string) => void;
}
