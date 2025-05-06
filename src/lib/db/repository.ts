import { getPrismaClient } from './db';

export async function getAllUsers() {
	const prisma = getPrismaClient();
	return await prisma.user.findMany({
		include: {
			posts: true,
			profile: true
		}
	});
}
