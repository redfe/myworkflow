<script lang="ts">
	import cytoscape from 'cytoscape';
	import { onMount } from 'svelte';

	let { data } = $props();
	let cy: cytoscape.Core | undefined = $state();

	onMount(() => {
		cy = cytoscape({
			container: document.getElementById('cy'),

			elements: data.elements,

			style: [
				{
					selector: 'node',
					style: {
						label: 'data(label)',
						'text-valign': 'center',
						color: '#333',
						'background-color': '#C0E8D5',
						'text-wrap': 'wrap',
						'text-max-width': '100px',
						'font-size': '12px'
					}
				},
				{
					selector: 'edge',
					style: {
						'curve-style': 'bezier',
						'target-arrow-shape': 'triangle',
						'target-arrow-color': '#aaa',
						'line-color': '#aaa',
						width: 1,
						'font-size': '8px',
						'text-background-color': '#fff',
						'text-background-opacity': 1,
						'text-background-padding': '3px',
						'text-rotation': 'autorotate'
					}
				}
			],

			layout: {
				name: 'cose', // 自動でいい感じにレイアウト
				padding: 30
			}
		});

		cy.on('tap', (evt) => {
			var tappedNode = evt.target; // クリックされたノードを取得
			var targetGroup = tappedNode.data('group'); // クリックされたノードの 'group' 値を取得

			if (!targetGroup) return;

			// まず、すべての強調表示をリセットする（オプション）
			cy!.elements().removeClass('highlighted-group');

			// 同じ 'group' 値を持つノードを選択
			var edgesToHighlight = cy!.edges().filter((n) => n.attr('group') === targetGroup);

			// 強調表示する要素にクラスを追加
			edgesToHighlight.addClass('highlighted-group');
		});

		// スタイルシートで 'highlighted-group' クラスのスタイルを定義
		cy.style()
			.selector('.highlighted-group')
			.style({
				'background-color': 'blue',
				'line-color': 'blue',
				'target-arrow-color': 'blue',
				width: 3,
				opacity: 1,
				label: 'data(label)'
			})
			.update();
	});
</script>

{#if cy == null}
	<div class="space-y-4">
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
	</div>
{/if}
<div class="h-lvh pr-5 pb-60">
	<div id="cy" class="preset-outlined-primary-950-50 h-full w-full"></div>
</div>
