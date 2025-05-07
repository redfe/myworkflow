<script lang="ts">
	let { data } = $props();
	let usersPromise = data.users;
</script>

{#await usersPromise}
	<p class="p-4">Loading...</p>
	<div class="space-y-4">
		<div class="placeholder animate-pulse"></div>
		<div class="grid grid-cols-4 gap-4">
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
	</div>
{:then users}
	<pre class="overflow-x-auto">{JSON.stringify(users, null, 2)}</pre>
{/await}
