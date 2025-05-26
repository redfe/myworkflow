import { getAllWorks } from '$lib/db';
import { randomUUID } from 'crypto';
import type { ElementDefinition } from 'cytoscape';

export const load = async ({ locals }) => {
	const userId = locals.userId!;
	return { elements: getElements(userId) };
};

async function getElements(userId: string) {
	const works = await getAllWorks(userId);

	const workElementNames = new Set();
	const edges: ElementDefinition[] = works.flatMap((work) => {
		workElementNames.add(work.inputElement?.name);
		workElementNames.add(work.outputElement?.name);
		return [
			{
				data: {
					group: String(work.id),
					id: randomUUID(),
					source: work.inputElement!.name,
					target: userId,
					label: '入力:' + work.inputInformation,
					workDescription: work.workDescription,
					workerId: userId
				}
			},
			{
				data: {
					group: String(work.id),
					id: randomUUID(),
					source: userId,
					target: work.outputElement!.name,
					label: '出力:' + work.outputInformation,
					workDescription: work.workDescription,
					workerId: userId
				}
			}
		];
	});

	const nodes: ElementDefinition[] = Array.from(workElementNames as Set<string>).map((name) => ({
		data: {
			id: name,
			label: name,
			labelAndWork: name // 作業者と作業名を併記するためのプロパティ
		}
	}));

	const elements: ElementDefinition[] = [
		{ data: { id: userId, label: 'あなた' } },
		...nodes,
		...edges
	];

	return elements;
}
