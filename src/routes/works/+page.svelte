<script lang="ts">
	import { Link } from '$lib/components/Link';
	import { m } from '$lib/paraglide/messages';
	import { ChevronDownIcon, ChevronUpIcon, EditIcon } from '@lucide/svelte';
	import type { Component } from 'svelte';

	const { data } = $props();
	const worksPromise = data.works;
</script>

<div class="mb-4">
	<Link class="btn preset-filled-primary-500" href="/works/add">{m.btn_title_add()}</Link>
</div>

{#await worksPromise}
	<div class="space-y-4">
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
	</div>
{:then list}
	<ul class="flex flex-col items-center gap-4">
		{#each list as item}
			<li class="w-full">
				{@render work(item)}
			</li>
		{/each}
	</ul>
{/await}

{#snippet work(item: Awaited<typeof worksPromise>[number])}
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
						{item.inputElement?.name}<span class="text-surface-500 text-xs"
							>&nbsp;/&nbsp{item.inputInformation}</span
						>
					</td>
				</tr>
				<tr>
					{@render th(m.work_name())}
					<td>{item.workDescription}</td>
				</tr>
				<tr>
					{@render th(m.work_output_name())}
					<td
						>{item.outputElement?.name}
						<span class="text-surface-500 text-xs">&nbsp;/&nbsp{item.outputInformation}</span></td
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
