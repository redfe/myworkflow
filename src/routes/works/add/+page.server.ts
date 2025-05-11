import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	register: async () => {
		return redirect(303, '/works');
	}
} satisfies Actions;
