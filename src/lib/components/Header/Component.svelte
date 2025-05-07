<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import {
		ArrowLeftIcon,
		PaperclipIcon,
		CalendarIcon,
		CircleUserIcon,
		MenuIcon
	} from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import type { HeaderProps } from './types';

	const { breadCrumbs, pageTitle }: HeaderProps = $props();
</script>

<AppBar
	background="preset-filled-surface-400-600 opacity-80 sm:space-y-0"
	headlineClasses="sm:hidden"
	classes="p-2"
>
	{#snippet lead()}
		{#if breadCrumbs.length > 1}
			<a class="sm:hidden" href={breadCrumbs[breadCrumbs.length - 2].href}>
				<ArrowLeftIcon size={24} class="sm:hidden" />
			</a>
		{/if}
	{/snippet}
	{#snippet trail()}
		<div class="hidden space-x-4 sm:flex">
			<PaperclipIcon size={20} />
			<CalendarIcon size={20} />
			<CircleUserIcon size={20} />
		</div>
		<div class="block sm:hidden">
			<MenuIcon size={20} />
		</div>
	{/snippet}
	{#snippet headline()}
		<span class="h2">{pageTitle}</span>
	{/snippet}
	<span>{m.app_name()}</span>
</AppBar>
