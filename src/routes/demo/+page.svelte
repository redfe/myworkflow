<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeUrl } from '$lib/paraglide/runtime';
</script>

<ul class="list-inside list-disc space-y-2">
	<li>
		<a href={localizeUrl('/demo/db').href} class="anchor">{m.page_title_db()}</a>
	</li>
	<li>
		<a href={localizeUrl('/demo/paraglide').href} class="anchor">{m.page_title_i18n()}</a>
	</li>
</ul>
