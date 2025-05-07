<script lang="ts">
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
	import '../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import {
		ArrowLeftIcon,
		HomeIcon,
		PaperclipIcon,
		CalendarIcon,
		CircleUserIcon,
		MenuIcon,
		BoxIcon,
		ChevronsLeftIcon,
		ChevronsRightIcon,
		SettingsIcon,
		SmileIcon
	} from '@lucide/svelte';
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { BreadCrumbs } from '$lib/components/BreadCrumbs';
	import { m } from '$lib/paraglide/messages';

	const activeMenuClasses = 'preset-filled-surface-500';

	const navValueMap = [
		{ id: 'home', label: m.page_title_home(), href: '/', icon: HomeIcon },
		{ id: 'demo', label: m.page_title_demo(), href: '/demo', icon: SmileIcon },
		{ id: 'other', label: m.page_title_other(), href: '/other', icon: BoxIcon },
		{ id: 'setting', label: m.page_title_setting(), href: '/setting', icon: SettingsIcon }
	];
	const tilesNavValueMap = [...navValueMap.filter((item) => item.id !== 'setting')];
	const sortedNavValueMap = [...navValueMap].sort((a, b) => b.href.length - a.href.length);

	let { children } = $props();

	let nav = $derived(navValue(page.route.id));

	let breadCrumbs = $derived(page.data.breadCrumbs);
	let pageTitle = $derived(page.data.title);

	let isExpansed = $state(true);

	function toggleExpanded() {
		isExpansed = !isExpansed;
	}

	function navValue(routeId: string | null) {
		if (!routeId) {
			return 'home';
		}
		const item = sortedNavValueMap.find((item) => routeId.startsWith(item.href));
		return item ? item.id : '';
	}

	function onNavValueChange(newNavValue: string) {
		const item = navValueMap.find((item) => item.id === newNavValue);
		if (item) {
			goto(localizeUrl(item.href));
		} else {
			goto(localizeUrl('/'));
		}
	}
</script>

{#snippet navTiles(isUseLabel = false)}
	{@const active = activeMenuClasses}
	{#each tilesNavValueMap as { id, label, href, icon: Icon }}
		<Navigation.Tile
			labelExpanded={label}
			label={isUseLabel ? label : undefined}
			{id}
			{active}
			{href}><Icon /></Navigation.Tile
		>
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
				{#if breadCrumbs.length > 0}
					<a class="sm:hidden" href={breadCrumbs[breadCrumbs.length - 1].href}>
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
	</header>
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<!-- Left Sidebar. -->
		<Navigation.Rail
			expanded={isExpansed}
			classes="hidden md:flex"
			tilesClasses="mt-16"
			tilesJustify="start"
			value={nav}
			onValueChange={onNavValueChange}
		>
			{#snippet header()}
				{@const Icon = isExpansed ? ChevronsLeftIcon : ChevronsRightIcon}
				<Navigation.Tile onclick={toggleExpanded} title={m.toggle_menu_title()}
					><Icon /></Navigation.Tile
				>
			{/snippet}
			{#snippet tiles()}
				{@render navTiles()}
			{/snippet}
			{#snippet footer()}
				{@const active = activeMenuClasses}
				<Navigation.Tile
					selected={nav === 'setting'}
					{active}
					labelExpanded={m.page_title_setting()}
					href="/setting"><SettingsIcon /></Navigation.Tile
				>
			{/snippet}
		</Navigation.Rail>
		<!-- Bottom Bar. -->
		<nav class="fixed bottom-0 z-10 flex w-full backdrop-blur-sm md:hidden">
			<Navigation.Bar
				background="preset-filled-surface-100-900 opacity-80"
				value={nav}
				onValueChange={onNavValueChange}
			>
				{@render navTiles(true)}
			</Navigation.Bar>
		</nav>
		<!-- Main -->
		<main class="min-h-150 p-4">
			{#if pageTitle || breadCrumbs.length > 0}
				<div class="mb-4 hidden sm:block">
					<BreadCrumbs items={breadCrumbs} />
					<span class="h1">{pageTitle}</span>
				</div>
			{/if}
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
