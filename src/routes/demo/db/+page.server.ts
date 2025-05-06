import { getAllUsers } from '$lib/db/repository';

export const load = async () => {
	return {
		users: await getAllUsers()
	};
};
