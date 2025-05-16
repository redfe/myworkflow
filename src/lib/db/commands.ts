import { getPrismaClient } from './db';
import type { UserWork } from '@prisma/client';

type RegisterWorkProps = Omit<UserWork, 'id' | 'createdAt' | 'updatedAt'>;

export async function registerWork(props: RegisterWorkProps) {
	const prisma = getPrismaClient();
	const now = new Date();
	const userWork = {
		...props,
		createdAt: now,
		updatedAt: now
	};
	await prisma.userWork.create({ data: userWork });
}

type UpdateWorkProps = Omit<UserWork, 'createdAt' | 'updatedAt'>;

export async function updateWork(props: UpdateWorkProps) {
	const prisma = getPrismaClient();
	const now = new Date();
	const userWork = {
		...props,
		inputElementId: Number(props.inputElementId),
		outputElementId: Number(props.outputElementId),
		updatedAt: now
	};
	await prisma.userWork.update({
		where: {
			id: userWork.id,
			userId: userWork.userId
		},
		data: { ...userWork, id: undefined }
	});
}

type DeleteWorkProps = Pick<UserWork, 'id' | 'userId'>;

export async function deleteWork(props: DeleteWorkProps) {
	const prisma = getPrismaClient();
	await prisma.userWork.delete({
		where: {
			id: props.id,
			userId: props.userId
		}
	});
}
