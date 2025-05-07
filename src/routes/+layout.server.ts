export function load() {
	// 画面毎に違う値かつ描画を遅延させたくないものは +layout.server.ts に記載する
	// 記載対象例：タイトルなど遅延があるとユーザーに不快感を与えるもの
	return {
		breadCrumbs: []
	};
}
