<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { navs, activeMenuClasses, hoverMenuClasses } from '$lib/constants/navigation';
	import type { BottomNavigationProps } from './types';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { navId, onNavValueChange }: BottomNavigationProps = $props();

	const tilesNavValueMap = [...navs.filter((item) => item.id !== 'setting')];
</script>

<div class="pb-14 md:hidden"></div>
<nav
	id="bottom-navigation"
	class="border-surface-100-900 fixed bottom-0 z-10 flex w-full border-t-1 backdrop-blur-sm md:hidden"
>
	<Navigation.Bar
		height="h-16 pb-4"
		background="preset-filled-surface-50-950 opacity-80"
		value={navId}
		onValueChange={onNavValueChange}
	>
		{@render navTiles()}
	</Navigation.Bar>
</nav>

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
			href={localizeHref(href)}><Icon size={20} /></Navigation.Tile
		>
	{/each}
{/snippet}
