<script lang="ts">
	import { Link } from '$lib/components/Link';
	import { m } from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';
</script>

<form
	class="space-y-4-w-100 flex w-full max-w-md flex-col gap-4"
	action="?/register"
	method="POST"
	use:enhance
>
	<label class="label">
		<span class="label-text">{m.work_input_element()}</span>
		<select class="select" name="inputElement">
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
	</label>
	<label class="label">
		<span class="label-text">{m.work_input_information()}</span>
		<input type="text" class="input" name="inputInformation" />
	</label>
	<label class="label">
		<span class="label-text">{m.work_name()}</span>
		<input type="text" class="input" name="workName" />
	</label>
	<label class="label">
		<span class="label-text">{m.work_output_element()}</span>
		<select class="select" name="outputElement">
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
	</label>
	<label class="label">
		<span class="label-text">{m.work_output_information()}</span>
		<input type="text" class="input" name="outputInformation" />
	</label>
	<div class="flex flex-row gap-4">
		<button type="submit" class="btn preset-filled-primary-500">{m.btn_title_register()}</button>
		<Link class="btn preset-outlined-surface-500" href="/works">{m.btn_title_cancel()}</Link>
	</div>
</form>
