/**
 * ヘッダーコンポーネントのプロパティ
 */
export interface HeaderProps {
	/** パンくずリストの配列 */
	breadCrumbs: Array<{
		/** リンクのテキスト */
		label: string;
		/** リンク先のパス */
		href: string;
	}>;

	/** ページのタイトル */
	pageTitle: string;
}
