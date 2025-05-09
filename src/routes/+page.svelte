<script>
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
</script>

<p>{m.msg_home()}</p>
<p>userId: {page.data.userId}</p>
