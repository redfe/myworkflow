<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { ChevronsLeftIcon, ChevronsRightIcon, SettingsIcon } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import { navs, activeMenuClasses, hoverMenuClasses } from '$lib/constants/navigation';
	import type { SideNavigationProps } from './types';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { isExpanded = $bindable(), navId, onNavValueChange }: SideNavigationProps = $props();

	const tilesNavValueMap = [...navs.filter((item) => item.id !== 'setting')];

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}
</script>

<!-- Left Sidebar. -->
<Navigation.Rail
	expanded={isExpanded}
	background="preset-filled-surface-50-950"
	classes="hidden sm:flex"
	headerFlexDirection="row"
	headerJustify="justify-end"
	tilesJustify="start"
	value={navId}
	onValueChange={onNavValueChange}
>
	{#snippet header()}
		{@const Icon = isExpanded ? ChevronsLeftIcon : ChevronsRightIcon}
		<Navigation.Tile
			width="w-12"
			onclick={toggleExpanded}
			title={m.btn_title_toggle_menu()}
			hover={hoverMenuClasses}><Icon /></Navigation.Tile
		>
	{/snippet}
	{#snippet tiles()}
		{@render navTiles()}
	{/snippet}
	{#snippet footer()}
		{@const active = activeMenuClasses}
		<Navigation.Tile
			selected={navId === 'setting'}
			{active}
			hover={hoverMenuClasses}
			title={m.page_title_setting()}
			labelExpanded={m.page_title_setting()}
			href={localizeHref('/setting')}><SettingsIcon /></Navigation.Tile
		>
	{/snippet}
</Navigation.Rail>

{#snippet navTiles(isUseLabel = false)}
	{@const active = activeMenuClasses}
	{#each tilesNavValueMap as { id, label, href, icon: Icon }}
		<Navigation.Tile
			labelExpanded={label}
			title={label}
			label={isUseLabel ? label : undefined}
			hover={hoverMenuClasses}
			{id}
			{active}
			href={localizeHref(href)}><Icon /></Navigation.Tile
		>
	{/each}
{/snippet}
