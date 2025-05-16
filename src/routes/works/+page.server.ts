import { getAllWorks } from '$lib/db';
import { superValidate } from 'sveltekit-superforms';
import { DeleteWorkSchema } from './schema.js';
import { classvalidator } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { deleteWork } from '$lib/db/commands.js';

const defaults = new DeleteWorkSchema();

export const load = async ({ locals }) => {
	const works = await getAllWorks(locals.userId!);
	// 注意： awaitしないで返すと +page.svelte 側の{#await}が一からやり直されるため、transitionが効かなくなってしまう
	return { works };
};

export const actions = {
	delete: async ({ request, locals }) => {
		const userId = locals.userId!;
		const form = await superValidate(request, classvalidator(DeleteWorkSchema, { defaults }));

		if (!form.valid) {
			return fail(400, { form });
		}

		await deleteWork({ id: Number(form.data.id!), userId });
	}
};
