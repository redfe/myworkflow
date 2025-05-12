<script lang="ts">
	import { Link } from '$lib/components/Link';
	import { m } from '$lib/paraglide/messages';
	import { enhance } from '$app/forms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { dev } from '$app/environment';

	let { data } = $props();

	const { form, errors, constraints } = superForm(data.form);
</script>

<form
	class="space-y-4-w-100 flex w-full max-w-md flex-col gap-4"
	action="?/register"
	method="POST"
	use:enhance
>
	<label class="label">
		<span class="label-text">{m.work_input_element()}</span>
		<select
			class="select"
			class:preset-tonal-error={$errors.inputElement != null}
			name="inputElement"
			bind:value={$form.inputElement}
			{...$constraints.inputElement}
		>
			<option value=""></option>
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
		<p class="text-error-500 text-sm" class:hidden={$errors.inputElement == null}>
			{$errors.inputElement}
		</p>
	</label>
	<label class="label">
		<span class="label-text">{m.work_input_information()}</span>
		<input
			type="text"
			class="input"
			name="inputInformation"
			bind:value={$form.inputInformation}
			{...$constraints.inputInformation}
		/>
		<p class="text-error-500 text-sm" class:hidden={$errors.inputInformation == null}>
			{$errors.inputInformation}
		</p>
	</label>
	<label class="label">
		<span class="label-text">{m.work_name()}</span>
		<input
			type="text"
			class="input"
			name="workName"
			bind:value={$form.workName}
			{...$constraints.outputElement}
		/>
		<p class="text-error-500 text-sm" class:hidden={$errors.workName == null}>{$errors.workName}</p>
	</label>
	<label class="label">
		<span class="label-text">{m.work_output_element()}</span>
		<select
			class="select"
			name="outputElement"
			bind:value={$form.outputElement}
			{...$constraints.outputElement}
		>
			<option value=""></option>
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
		<p class="text-error-500 text-sm" class:hidden={$errors.outputElement == null}>
			{$errors.outputElement}
		</p>
	</label>
	<label class="label">
		<span class="label-text">{m.work_output_information()}</span>
		<input
			type="text"
			class="input"
			name="outputInformation"
			bind:value={$form.outputInformation}
			{...$constraints.outputInformation}
		/>
		<p class="text-error-500 text-sm" class:hidden={$errors.outputInformation == null}>
			{$errors.outputInformation}
		</p>
	</label>
	<div class="flex flex-row gap-4">
		<button type="submit" class="btn preset-filled-primary-500">{m.btn_title_register()}</button>
		<Link class="btn preset-outlined-surface-500" href="/works">{m.btn_title_cancel()}</Link>
	</div>
</form>

<SuperDebug display={dev} data={$form} />
