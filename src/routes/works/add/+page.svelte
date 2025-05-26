<script lang="ts">
	import { WorkForm } from '$lib/components/WorkForm';

	let { data } = $props();
</script>

<WorkForm type="register" {data} />
