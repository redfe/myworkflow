<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { BreadCrumbs } from '$lib/components/BreadCrumbs';
	import { Header } from '$lib/components/Header';
	import { getExpanded, SideNavigation } from '$lib/components/SideNavigation';
	import { navs, type NavId } from '$lib/constants/navigation';
	import { Link } from '$lib/components/Link';
	import { BottomNavigation } from '$lib/components/BottomNavigation';

	let { children } = $props();
	let isExpanded = $state(getExpanded() ?? true);
	let navId: NavId | undefined = $derived(getNavId(page.route.id));
	let breadCrumbs = $derived(page.data.breadCrumbs);
	let pageTitle = $derived(page.data.title);

	function getNavId(routeId: string | null): NavId | undefined {
		if (!routeId) return undefined;
		const item = [...navs]
			// '/' がヒットしないように、長い順にソートしてから、最初にヒットしたものを返す
			.sort((a, b) => b.href.length - a.href.length)
			.find((item) => routeId.startsWith(item.href));
		return item ? item.id : undefined;
	}

	function onNavValueChange(newNavValue: string) {
		const item = navs.find((item) => item.id === newNavValue);
		if (!item) return;
		goto(localizeUrl(item.href));
	}
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<header class="border-surface-100-900 fixed top-0 z-10 w-full border-b-1 backdrop-blur-sm">
		{@render header()}
	</header>
	<div class="flex">
		<aside
			class="preset-filled-surface-50-950 border-surface-100-900 fixed top-14 hidden min-h-50 overflow-scroll border-r-1 sm:block"
			style="height: calc(100lvh - 56px)"
		>
			{@render sideNavigation()}
		</aside>
		<div class={'w-full ' + (isExpanded ? 'sm:ml-64' : 'sm:ml-24')}>
			<main
				class="preset-filled-surface-50-950 mt-15 min-h-150 p-4"
				style:min-height="calc(100lvh - 58px - 58px)"
			>
				<div>HEADERS: {page.data.DBURL}</div>
				{@render main()}
			</main>
			<footer class="preset-filled-surface-50-950 border-surface-100-900 w-full p-4 sm:pb-4">
				{@render footer()}
			</footer>
		</div>
	</div>
	<div class="block sm:hidden">
		<BottomNavigation {navId} {onNavValueChange} />
	</div>
</div>

{#snippet header()}
	<Header {breadCrumbs} {pageTitle} />
{/snippet}

{#snippet sideNavigation()}
	<SideNavigation bind:isExpanded {navId} {onNavValueChange} />
{/snippet}

{#snippet main()}
	{#if pageTitle || breadCrumbs.length > 0}
		<div class="sm:block">
			{#if breadCrumbs.length > 0}
				<BreadCrumbs items={breadCrumbs} />
			{/if}
			{#if pageTitle}
				<p class="h1 mb-6">{pageTitle}</p>
			{/if}
		</div>
	{/if}
	{@render children()}
{/snippet}

{#snippet footer()}
	<div class="mx-auto w-full max-w-screen-xl">
		<span class="block text-sm md:text-center">
			© 2025 <Link href="https://github.com/redfe" target="_blank" rel="noopener">RedFe</Link>. All
			Rights Reserved.
		</span>
	</div>
{/snippet}
