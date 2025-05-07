// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		/**
		 * エラー情報を表すインターフェース
		 */
		// interface Error {}

		/**
		 * サーバーサイドのローカル情報を表すインターフェース
		 */
		// interface Locals {}

		/**
		 * ページデータを表すインターフェース
		 */
		interface PageData {
			/**
			 * ページのタイトル
			 */
			title: string;

			/**
			 * パンくずリストの配列
			 */
			breadCrumbs: Array<{
				/** リンクのテキスト */
				label: string;
				/** リンク先のパス */
				href?: string;
			}>;
		}

		/**
		 * ページの状態を表すインターフェース
		 */
		// interface PageState {}

		/**
		 * プラットフォーム固有の情報を表すインターフェース
		 */
		// interface Platform {}
	}
}

export {};
