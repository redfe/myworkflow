import { getAllUsers } from '$lib/db';

export const load = async () => {
	return {
		users: await getAllUsers()
	};
};
