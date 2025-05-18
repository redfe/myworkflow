<script lang="ts">
	import { enhance } from '$app/forms';
	import { Link } from '$lib/components/Link';
	import { SubmitButton } from '$lib/components/SubmitButton/index.js';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { DeleteIcon, EditIcon } from '@lucide/svelte';
	import type { Component } from 'svelte';
	import { slide } from 'svelte/transition';

	const headerButtonClass = 'hover:bg-surface-100-900 rounded-container p-1';

	let { data } = $props();
	let deleting: number[] = $state([]);

	function isDeleting(id: number) {
		return deleting.includes(id);
	}
</script>

<div class="mb-4">
	<Link class="btn preset-filled-primary-500" href="/works/add">{m.btn_title_add()}</Link>
</div>

{#if data.works == null}
	<div class="space-y-4">
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
	</div>
{:else}
	<ul class="flex flex-col items-center gap-4">
		{#each data.works as item (item.id)}
			<li class="w-full">
				{@render work(item)}
			</li>
		{/each}
	</ul>
{/if}

{#snippet work(item: (typeof data.works)[number])}
	<div
		class="card preset-outlined-surface-300-700 flex flex-col gap-2 overflow-hidden p-2"
		class:preset-filled-surface-100-900={isDeleting(item.id)}
		out:slide
	>
		<div class="flex w-full flex-row justify-start gap-2">
			{@render editButton(m.btn_title_edit(), item.id, EditIcon)}
			{@render deleteButton(m.btn_title_delete(), item.id, DeleteIcon)}
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

{#snippet editButton(title: string, id: number, Icon: Component)}
	{#if isDeleting(id)}
		<Icon />
	{:else}
		<a href={localizeHref(`/works/${id}/update`)} {title} class={headerButtonClass}><Icon /></a>
	{/if}
{/snippet}

{#snippet deleteButton(title: string, id: number, Icon: Component)}
	<form
		method="POST"
		action="?/delete"
		use:enhance={() => {
			deleting = [...deleting, id];
			return async ({ update }) => {
				await update();
				deleting = deleting.filter((_id) => _id !== id);
			};
		}}
	>
		<input type="hidden" name="id" value={id} />
		<SubmitButton
			submitting={isDeleting(id)}
			{title}
			class={headerButtonClass}
			onclick={(e) => {
				if (!confirm('削除しますか？')) {
					e.preventDefault();
				}
			}}><Icon /></SubmitButton
		>
	</form>
{/snippet}

{#snippet th(text: string)}
	<th class="w-24 max-w-24 p-1 pr-4 font-bold text-nowrap">{text}</th>
{/snippet}
