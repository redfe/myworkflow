import { getPrismaClient } from './db';
import type { AddWorkSchema } from '../../routes/works/add/schema';

export async function registerWork(userWorkData: AddWorkSchema & { userId: string }) {
	const prisma = getPrismaClient();
	const now = new Date();
	const userWork = {
		...userWorkData,
		inputElementId: Number(userWorkData.inputElementId),
		outputElementId: Number(userWorkData.outputElementId),
		createdAt: now,
		updatedAt: now
	};
	await prisma.userWork.create({ data: userWork });
}
