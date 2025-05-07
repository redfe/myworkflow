<script lang="ts">
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import HomeIcon from '@lucide/svelte/icons/home';
	import Paperclip from '@lucide/svelte/icons/paperclip';
	import Calendar from '@lucide/svelte/icons/calendar';
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import Menu from '@lucide/svelte/icons/menu';
	import '../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { SmileIcon } from '@lucide/svelte';
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { BreadCrumbs } from '$lib/components/BreadCrumbs';
	import { m } from '$lib/paraglide/messages';

	const navValueMap = [
		{ id: 'home', label: m.page_title_home(), path: '/', icon: HomeIcon },
		{ id: 'demo', label: m.page_title_demo(), path: '/demo', icon: SmileIcon }
	];
	const sortedNavValueMap = [...navValueMap].sort((a, b) => b.path.length - a.path.length);

	let { children } = $props();

	let nav = $derived(navValue(page.route.id));

	let breadCrumbs = $derived(page.data.breadCrumbs);
	let pageTitle = $derived(page.data.title);

	function navValue(routeId: string | null) {
		if (!routeId) {
			return 'home';
		}
		const item = sortedNavValueMap.find((item) => routeId.startsWith(item.path));
		return item ? item.id : 'home';
	}

	function onNavValueChange(newNavValue: string) {
		const item = navValueMap.find((item) => item.id === newNavValue);
		if (item) {
			goto(localizeUrl(item.path));
		} else {
			goto(localizeUrl('/'));
		}
	}
</script>

{#snippet navTiles()}
	{@const active = 'preset-filled-surface-500'}
	{#each navValueMap as { id, label, icon: Icon }}
		<Navigation.Tile {id} {label} {active}><Icon /></Navigation.Tile>
	{/each}
{/snippet}

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="sticky top-0 z-10 backdrop-blur-sm">
		<AppBar
			background="preset-filled-surface-400-600 opacity-80 sm:space-y-0"
			headlineClasses="sm:hidden"
			classes="p-2"
		>
			{#snippet lead()}
				{#if breadCrumbs.length > 1}
					<button
						type="button"
						class="sm:hidden"
						onclick={() => goto(breadCrumbs[breadCrumbs.length - 1].href)}
					>
						<ArrowLeft size={24} class="sm:hidden" />
					</button>
				{/if}
			{/snippet}
			{#snippet trail()}
				<div class="hidden space-x-4 sm:flex">
					<Paperclip size={20} />
					<Calendar size={20} />
					<CircleUser size={20} />
				</div>
				<div class="block sm:hidden">
					<Menu size={20} />
				</div>
			{/snippet}
			{#snippet headline()}
				<span class="h2">{pageTitle}</span>
			{/snippet}
			<span>{m.app_name()}</span>
		</AppBar>
	</header>
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<!-- Left Sidebar. -->
		<Navigation.Rail
			classes="hidden md:flex"
			tilesJustify="justify-start"
			value={nav}
			onValueChange={onNavValueChange}
		>
			{#snippet tiles()}
				{@render navTiles()}
			{/snippet}
		</Navigation.Rail>

		<!-- Bottom Bar. -->
		<nav class="fixed bottom-0 z-10 flex w-full backdrop-blur-sm md:hidden">
			<Navigation.Bar
				background="preset-filled-surface-100-900 opacity-80"
				value={nav}
				onValueChange={onNavValueChange}
			>
				{@render navTiles()}
			</Navigation.Bar>
		</nav>

		<!-- Main -->
		<main class="min-h-150 p-4">
			<div class="mb-4 hidden sm:block">
				<BreadCrumbs items={breadCrumbs} />
				<span class="h1">{pageTitle}</span>
			</div>
			{@render children()}
		</main>
	</div>
	<!-- Footer -->
	<footer class="preset-filled-surface-400-600 p-4 pb-26 opacity-80 md:pb-4">
		<div class="mx-auto w-full max-w-screen-xl">
			<span class="block text-sm md:text-center"
				>© 2025 <a
					href="https://github.com/redfe"
					class="hover:underline"
					target="_blank"
					rel="noopener">RedFe</a
				>. All Rights Reserved.</span
			>
		</div>
	</footer>
</div>
