<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { BreadCrumbs } from '$lib/components/BreadCrumbs';
	import { Header } from '$lib/components/Header';
	import { SideNavigation } from '$lib/components/SideNavigation';
	import { navs, type NavId } from '$lib/constants/navigation';
	import { Link } from '$lib/components/Link';
	import { BottomNavigation } from '$lib/components/BottomNavigation';

	let { children } = $props();
	let isExpanded = $state(true);
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
	<header class="border-surface-100-900 sticky top-0 z-10 border-b-1 backdrop-blur-sm">
		{@render header()}
	</header>
	<div class="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
		<aside class="preset-filled-surface-50-950 border-surface-100-900 hidden border-r-1 sm:block">
			{@render sideNavigation()}
		</aside>
		<main class="preset-filled-surface-50-950 min-h-150 p-4">{@render main()}</main>
	</div>
	<footer class="preset-filled-surface-50-950 border-surface-100-900 p-4 sm:border-t-1 sm:pb-4">
		{@render footer()}
	</footer>
	<div class="block sm:hidden">
		<BottomNavigation {navId} {onNavValueChange} />
	</div>
</div>

{#snippet header()}
	<Header {breadCrumbs} {pageTitle} />
{/snippet}

{#snippet sideNavigation()}
	<SideNavigation {isExpanded} {navId} {onNavValueChange} />
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
