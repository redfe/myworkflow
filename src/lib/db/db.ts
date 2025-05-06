import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

type PrismaClientType = ReturnType<typeof newPrismaClient>;

let prisma: PrismaClientType | undefined;

function newPrismaClient() {
	return new PrismaClient().$extends(withAccelerate());
}

/**
 * PrismaClient を取得する
 * グローバル変数で PrismaClient 書初期化すると npm run build 時に DB へ接続しにいってしまいエラーになってしてしまうため
 * @returns {PrismaClient}
 */
export function getPrismaClient() {
	if (prisma) {
		return prisma;
	}
	prisma = newPrismaClient();
	return prisma;
}
