<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { ArrowLeftIcon, MenuIcon, LogOutIcon } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import type { HeaderProps } from './types';
	import { Link } from '$lib/components/Link';

	const { breadCrumbs, pageTitle }: HeaderProps = $props();
</script>

<AppBar
	background="preset-filled-surface-50-950"
	classes="opacity-80 sm:space-y-0"
	headlineClasses="sm:hidden"
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
			<Link
				class="hover:bg-surface-100-900 rounded-container p-1"
				title={m.btn_title_logout()}
				href="/.auth/logout"><LogOutIcon size={20} /></Link
			>
		</div>
		<div class="block sm:hidden">
			<MenuIcon size={24} />
		</div>
	{/snippet}
	{#snippet headline()}
		<span class="h2">{pageTitle}</span>
	{/snippet}
	<span>{m.app_name()}</span>
</AppBar>
