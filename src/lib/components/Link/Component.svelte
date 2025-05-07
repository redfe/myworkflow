<script lang="ts">
	import type { LinkProps } from './types';

	const { children, ...others }: LinkProps = $props();
	const classes = others.class ?? '';
</script>

<a class="opacity-60 hover:underline {classes}" {...others}>
	{@render children?.()}
</a>
