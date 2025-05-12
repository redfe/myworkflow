import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { schema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { classvalidator } from 'sveltekit-superforms/adapters';

const defaults = new schema();

export const load = async () => {
	const form = await superValidate(classvalidator(schema, { defaults }));
	return { form };
};

export const actions = {
	register: async ({ request }) => {
		const form = await superValidate(request, classvalidator(schema, { defaults }));

		if (!form.valid) {
			return fail(400, { form });
		}

		return redirect(303, '/works');
	}
} satisfies Actions;
