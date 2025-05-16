import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AddWorkSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { classvalidator } from 'sveltekit-superforms/adapters';
import { registerWork } from '$lib/db/commands';
import { getAllWorkElement } from '$lib/db';

const defaults = new AddWorkSchema();

export const load = async () => {
	const form = await superValidate(classvalidator(AddWorkSchema, { defaults }));
	const workElements = await getAllWorkElement();
	return { form, workElements };
};

export const actions = {
	register: async ({ request, locals }) => {
		const form = await superValidate(request, classvalidator(AddWorkSchema, { defaults }));

		if (!form.valid) {
			return fail(400, { form });
		}

		const userId = locals.userId!;
		const userWork = { ...form.data, userId };
		await registerWork({
			...userWork,
			inputElementId: Number(userWork.inputElementId),
			outputElementId: Number(userWork.outputElementId)
		});
		return redirect(303, '/works');
	}
} satisfies Actions;
