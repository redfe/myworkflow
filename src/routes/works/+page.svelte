<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { ChevronDownIcon, ChevronUpIcon, ComponentIcon, EditIcon, Icon } from '@lucide/svelte';
	import type { Component } from 'svelte';

	const list = new Array(10).fill(undefined);
</script>

<ul class="flex flex-col items-center gap-4">
	{#each list}
		<li class="w-full">
			{@render work()}
		</li>
	{/each}
</ul>

{#snippet work()}
	<div class="card preset-outlined-surface-300-700 flex flex-col gap-2 overflow-hidden p-2">
		<div class="flex w-full flex-row justify-start gap-2">
			{@render headerButton(m.btn_title_move_up(), ChevronUpIcon)}
			{@render headerButton(m.btn_title_move_down(), ChevronDownIcon)}
			{@render headerButton(m.btn_title_edit(), EditIcon)}
		</div>
		<table>
			<tbody>
				<tr>
					{@render th(m.work_input_name())}
					<td>
						山田さん<span class="text-surface-500 text-xs"
							>&nbsp;/&nbsp見積り依頼（あああああああ概要情報含む）</span
						>
					</td>
				</tr>
				<tr>
					{@render th(m.work_name())}
					<td>見積り作業</td>
				</tr>
				<tr>
					{@render th(m.work_output_name())}
					<td
						>山田さん
						<span class="text-surface-500 text-xs">&nbsp;/&nbsp見積り書</span></td
					>
				</tr>
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet headerButton(title: string, Icon: Component, onclick?: () => void)}
	<button type="button" {title} {onclick} class="hover:bg-surface-100-900 rounded-container p-1"
		><Icon /></button
	>
{/snippet}

{#snippet th(text: string)}
	<th class="max-w-24 p-1 pr-4 font-bold text-nowrap">{text}</th>
{/snippet}
