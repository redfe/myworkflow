<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<h1 class="h1">{m.hello_world({ name: 'SvelteKit User' })}</h1>
<div>
	<button class="btn preset-filled-primary-500" onclick={() => setLocale('ja')}>ja</button>
	<button class="btn preset-filled-primary-500" onclick={() => setLocale('en')}>en</button>
</div>
<p>
	If you use VSCode, install the <a
		class="anchor"
		href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
		target="_blank">Sherlock i18n extension</a
	> for a better i18n experience.
</p>
