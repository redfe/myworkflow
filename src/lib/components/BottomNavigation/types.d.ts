import type { NavId } from '$lib/constants/navigation';

/**
 * BottomNavigationコンポーネントのプロパティ
 */
export interface BottomNavigationProps {
	/** 現在選択されているナビゲーションアイテムのID */
	navId?: NavId;

	/** ナビゲーションアイテムが選択された時のコールバック */
	onNavValueChange: (value: string) => void;
}
