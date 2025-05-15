import { getAllWorks } from '$lib/db';

export const load = async ({ locals }) => {
	const works = getAllWorks(locals.userId!);
	return { works };
};
