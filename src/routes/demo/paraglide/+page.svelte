<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<pre class="pre my-4">{m.msg_hello_world({ name: 'SvelteKit User' })}</pre>
<div>
	<button class="btn preset-filled-primary-500" onclick={() => setLocale('ja')}>ja</button>
	<button class="btn preset-filled-primary-500" onclick={() => setLocale('en')}>en</button>
</div>
