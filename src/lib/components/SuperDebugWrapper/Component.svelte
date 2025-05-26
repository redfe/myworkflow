<script lang="ts">
	import SuperDebug from 'sveltekit-superforms';
	import type { SuperDebugWrapperProps as Props } from './types';
	import type { SuperDebugProps } from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';

	const { class: classes, ...others }: Props = $props();
	const superDebugProps: SuperDebugProps = others;
</script>

<div class={classes ?? ''}>
	<SuperDebug {...superDebugProps} display={dev} />
</div>
