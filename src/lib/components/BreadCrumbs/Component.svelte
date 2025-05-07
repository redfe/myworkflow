<script lang="ts">
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { Link } from '$lib/components/Link';
	import type { BreadCrumbsProps } from './types';

	const { items }: BreadCrumbsProps = $props();
</script>

{#if items.length !== 0}
	<ol class="mb-6 hidden items-center gap-4 md:flex">
		{#each items as item, i}
			<li class="flex items-center gap-2">
				{#if item.href}
					<Link href={localizeUrl(item.href).href}>{item.label}</Link>
				{:else}
					<span class="opacity-60">{item.label}</span>
				{/if}
			</li>
			{#if i < items.length - 1}
				<li class="opacity-50" aria-hidden="true">&rsaquo;</li>
			{/if}
		{/each}
	</ol>
{/if}
