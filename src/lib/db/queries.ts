import { getPrismaClient } from './db';

export async function getAllUsers() {
	const prisma = getPrismaClient();
	return await prisma.userWork.findMany({
		include: {
			inputElement: true,
			outputElement: true
		}
	});
}

export async function getAllWorkElement() {
	const prisma = getPrismaClient();
	return await prisma.workElement.findMany();
}

export async function getAllWorks(userId: string) {
	const prisma = getPrismaClient();
	return await prisma.userWork.findMany({
		where: {
			userId
		},
		include: {
			inputElement: true,
			outputElement: true
		}
	});
}
