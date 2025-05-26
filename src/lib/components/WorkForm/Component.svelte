<script lang="ts">
	// 参考: https://superforms.rocks/components

	import type { WorkFormProps as Props } from './types';
	import { Link } from '$lib/components/Link';
	import { m } from '$lib/paraglide/messages';
	import { superForm } from 'sveltekit-superforms';
	import { SubmitButton } from '$lib/components/SubmitButton';
	import { SuperDebugWrapper } from '$lib/components/SuperDebugWrapper';

	const { type, data }: Props = $props();

	let { form, errors, constraints, submitting, enhance } = superForm(data.form);
	const workElements = data.workElements;
</script>

<form
	class="space-y-4-w-100 flex w-full max-w-md flex-col gap-4"
	action="?/{type}"
	method="POST"
	use:enhance
>
	<label class="label">
		<span class="label-text">{m.work_input_element()}</span>
		<select
			class="select"
			name="inputElementId"
			bind:value={$form.inputElementId}
			{...$constraints.inputElementId}
		>
			{@render workElementOptions()}
		</select>
		<p class="text-error-500 text-sm" class:hidden={$errors.inputElementId == null}>
			{$errors.inputElementId}
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
			name="workDescription"
			bind:value={$form.workDescription}
			{...$constraints.outputElementId}
		/>
		<p class="text-error-500 text-sm" class:hidden={$errors.workDescription == null}>
			{$errors.workDescription}
		</p>
	</label>
	<label class="label">
		<span class="label-text">{m.work_output_element()}</span>
		<select
			class="select"
			name="outputElementId"
			bind:value={$form.outputElementId}
			{...$constraints.outputElementId}
		>
			{@render workElementOptions()}
		</select>
		<p class="text-error-500 text-sm" class:hidden={$errors.outputElementId == null}>
			{$errors.outputElementId}
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
		<SubmitButton submitting={$submitting}>
			{type === 'register' ? m.btn_title_register() : m.btn_title_update()}
		</SubmitButton>
		<Link class="btn preset-filled-surface-500" href="/works">{m.btn_title_cancel()}</Link>
	</div>
</form>

<SuperDebugWrapper data={$form} class="mt-4" />

{#snippet workElementOptions()}
	<option value=""></option>
	{#each workElements as item (item.id)}
		<option value={String(item.id)}>{item.name}</option>
	{/each}
{/snippet}
