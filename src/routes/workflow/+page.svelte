<script lang="ts">
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import cytoscape from 'cytoscape';
	import { onMount } from 'svelte';

	let { data } = $props();
	let cy: cytoscape.Core | undefined = $state();

	let ready = $state(false);

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
						width: 1,
						'font-size': '5px',
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

		cy.ready(() => {
			ready = true;
			// スタイルシートで 'highlighted-group' クラスのスタイルを定義
			cy!
				.style()
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
			cy!
				.style()
				.selector('.highlighted-node')
				.style({
					label: 'data(labelAndWork)',
					'background-color': '#aaf'
				})
				.update();
		});

		cy.on('tap', (evt) => {
			const tappedNode = evt.target;
			const targetGroup = tappedNode.data('group');
			const workerId = tappedNode.data('workerId');
			const worker = cy!.nodes(`[id="${workerId}"]`).first();

			// リセット
			if (worker) {
				worker.data('labelAndWork', worker.data('label'));
			}
			cy!.elements().removeClass('highlighted-group').removeClass('highlighted-node');

			if (!targetGroup) return;

			// 作業者に作業名を追記する
			if (worker) {
				const workDescription = tappedNode.data('workDescription');
				worker.data('labelAndWork', worker.data('label') + '\n' + workDescription);
				worker.addClass('highlighted-node');
			}

			// 関連するエッジを強調表示する
			const edgesToHighlight = cy!.edges().filter((n) => n.data('group') === targetGroup);
			edgesToHighlight.addClass('highlighted-group');

			// 関連するノードを強調表示する
			const sources: string[] = [];
			const targets: string[] = [];
			edgesToHighlight.forEach((e) => {
				sources.push(e.data('source'));
				targets.push(e.data('target'));
			});
			const nodesToHighlight = cy!
				.nodes()
				.filter((n) => sources.includes(n.data('label')) || targets.includes(n.data('label')));
			nodesToHighlight.addClass('highlighted-node');
		});
	});
</script>

<div class="h-lvh pr-5 pb-60" class:hidden={cy == null}>
	<div id="cy" class="preset-outlined-primary-950-50 h-full w-full">
		{#if !ready}
			<div class="flex h-full items-center justify-center">
				<ProgressRing
					value={null}
					size="size-14 md:size-24"
					meterStroke="stroke-surface-300-700"
					trackStroke="stroke-surface-100-900"
				/>
			</div>
		{/if}
	</div>
</div>
