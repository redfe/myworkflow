import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { UpdateWorkSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { classvalidator } from 'sveltekit-superforms/adapters';
import { updateWork } from '$lib/db/commands';
import { getAllWorkElement, getWork } from '$lib/db';

const defaults = new UpdateWorkSchema();

export const load = async ({ params, locals }) => {
	const id = Number(params.id);
	const userId = locals.userId!;
	const work = await getWork(userId, id);

	if (work == null) {
		throw error(404);
	}

	const formData = {
		id,
		inputElementId: String(work.inputElementId),
		inputInformation: work.inputInformation!,
		workDescription: work.workDescription!,
		outputElementId: String(work.outputElementId),
		outputInformation: work.outputInformation!
	};

	const form = await superValidate(formData, classvalidator(UpdateWorkSchema, { defaults }));
	const workElements = await getAllWorkElement();
	return { form, workElements };
};

export const actions = {
	update: async ({ request, locals, params }) => {
		const id = Number(params.id);
		const form = await superValidate(request, classvalidator(UpdateWorkSchema, { defaults }));

		if (!form.valid) {
			return fail(400, { form });
		}

		const userId = locals.userId!;
		const userWork = { ...form.data, userId };
		await updateWork({
			...userWork,
			id,
			inputElementId: Number(userWork.inputElementId),
			outputElementId: Number(userWork.outputElementId)
		});
		return redirect(303, '/works');
	}
} satisfies Actions;
