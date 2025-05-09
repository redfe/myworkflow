import { getPrismaClient } from './db';

export async function getAllUsers() {
	const prisma = getPrismaClient();
	return await prisma.userWork.findMany({
		include: {
			inputWorkElement: true,
			outputWorkElement: true
		}
	});
}
