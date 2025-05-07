<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeUrl } from '$lib/paraglide/runtime';
	import { Link } from '$lib/components/Link';
</script>

<ul class="list-inside list-disc space-y-2">
	<li>
		<Link href={localizeUrl('/demo/db').href}>{m.page_title_db()}</Link>
	</li>
	<li>
		<Link href={localizeUrl('/demo/paraglide').href}>{m.page_title_i18n()}</Link>
	</li>
</ul>
