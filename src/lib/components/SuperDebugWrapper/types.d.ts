import type { SuperDebugProps } from 'sveltekit-superforms/client/SuperDebug.svelte';

export type SuperDebugWrapperProps = Omit<SuperDebugProps & { class?: string }, 'display'>;
