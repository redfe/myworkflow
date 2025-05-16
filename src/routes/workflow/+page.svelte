<script lang="ts">
	import cytoscape from 'cytoscape';
	import { onMount } from 'svelte';

	let cy: any | null = $state();

	onMount(() => {
		cy = cytoscape({
			container: document.getElementById('cy'),

			elements: [
				// ノード定義
				{ data: { id: 'sato', label: '佐藤さん' } },
				{ data: { id: 'takahashi', label: '高橋さん' } },
				{ data: { id: 'suzuki', label: '鈴木さん' } },
				{ data: { id: 'ito', label: '伊藤さん' } },
				{ data: { id: 'tanaka', label: '田中さん' } },
				{ data: { id: 'kato', label: '加藤さん' } },
				{ data: { id: 'gyoumu', label: '業務管理システム' } },
				{ data: { id: 'seisan', label: '生産管理システム' } },

				// エッジ（線）定義
				{ data: { id: 'sato-to-suzuki', source: 'sato', target: 'suzuki' } },
				{
					data: {
						id: 'takahashi-to-gyoumu',
						source: 'takahashi',
						target: 'gyoumu'
					}
				},
				{
					data: {
						id: 'suzuki-to-gyoumu',
						source: 'suzuki',
						target: 'gyoumu'
					}
				},
				{ data: { id: 'gyoumu-to-tanaka', source: 'gyoumu', target: 'tanaka' } },
				{ data: { id: 'tanaka-to-ito', source: 'tanaka', target: 'ito' } },
				{ data: { id: 'ito-to-gyoumu', source: 'ito', target: 'gyoumu' } },
				{ data: { id: 'gyoumu-to-kato', source: 'gyoumu', target: 'kato' } },
				{
					data: {
						id: 'seisan-to-tanaka',
						source: 'seisan',
						target: 'tanaka'
					}
				}
			],

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
						'font-size': '5px'
					}
				},
				{
					selector: 'edge',
					style: {
						'curve-style': 'bezier',
						'target-arrow-shape': 'triangle',
						'target-arrow-color': '#aaa',
						'line-color': '#aaa',
						width: 2,
						label: 'data(label)',
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
