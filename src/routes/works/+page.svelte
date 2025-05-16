<script lang="ts">
	import { Link } from '$lib/components/Link';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref, localizeUrl } from '$lib/paraglide/runtime';
	import { ChevronDownIcon, ChevronUpIcon, EditIcon } from '@lucide/svelte';
	import type { Component } from 'svelte';

	const { data } = $props();
	const worksPromise = data.works;
	const headerButtonClass = 'hover:bg-surface-100-900 rounded-container p-1';
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
			{@render editButton(m.btn_title_edit(), item.id, EditIcon)}
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
	<button type="button" {title} {onclick} class={headerButtonClass}><Icon /></button>
{/snippet}

{#snippet editButton(title: string, id: number, Icon: Component)}
	<a href={localizeHref(`/works/${id}/update`)} {title} class={headerButtonClass}><Icon /></a>
{/snippet}

{#snippet th(text: string)}
	<th class="w-24 max-w-24 p-1 pr-4 font-bold text-nowrap">{text}</th>
{/snippet}
