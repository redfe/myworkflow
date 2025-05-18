<script lang="ts">
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import type { SubmitButtonProps as Props } from './types';

	const { submitting, children, ...others }: Props = $props();
	const classes = others.class ?? '';
</script>

<button
	type="submit"
	disabled={submitting}
	class="btn preset-filled-primary-500 {classes}"
	{...others}
>
	{#if submitting}
		<ProgressRing
			value={null}
			size="size-6"
			meterStroke="stroke-primary-600-400"
			trackStroke="stroke-primary-50-950"
		/>
	{:else}
		{@render children?.()}
	{/if}
</button>
