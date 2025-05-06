<script lang="ts">
	let { data } = $props();
	let users = data.users;
</script>

<pre class="overflow-x-auto">{JSON.stringify(users, null, 2)}</pre>
