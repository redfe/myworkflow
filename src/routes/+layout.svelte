<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { BreadCrumbs } from '$lib/components/BreadCrumbs';
	import { Header } from '$lib/components/Header';
	import { SideNavigation } from '$lib/components/SideNavigation';
	import { navs, type NavId } from '$lib/constants/navigation';

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
	<header class="sticky top-0 z-10 backdrop-blur-sm">
		{@render header()}
	</header>
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<aside>{@render sideNavigation()}</aside>
		<main class="min-h-150 p-4">{@render main()}</main>
	</div>
	<footer class="preset-filled-surface-400-600 p-4 pb-26 opacity-80 md:pb-4">
		{@render footer()}
	</footer>
</div>

{#snippet header()}
	<Header {breadCrumbs} {pageTitle} />
{/snippet}

{#snippet sideNavigation()}
	<SideNavigation {isExpanded} {navId} {onNavValueChange} />
{/snippet}

{#snippet main()}
	{#if pageTitle || breadCrumbs.length > 0}
		<div class="mb-4 hidden sm:block">
			<BreadCrumbs items={breadCrumbs} />
			<span class="h1">{pageTitle}</span>
		</div>
	{/if}
	{@render children()}
{/snippet}

{#snippet footer()}
	<div class="mx-auto w-full max-w-screen-xl">
		<span class="block text-sm md:text-center">
			© 2025 <a
				href="https://github.com/redfe"
				class="hover:underline"
				target="_blank"
				rel="noopener">RedFe</a
			>. All Rights Reserved.
		</span>
	</div>
{/snippet}
