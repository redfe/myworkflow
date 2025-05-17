import { getAllWorks } from '$lib/db';
import { randomUUID } from 'crypto';
import type { ElementDefinition } from 'cytoscape';

export const load = async ({ locals }) => {
	const userId = locals.userId!;
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
					label: work.inputInformation
				}
			},
			{
				data: {
					group: String(work.id),
					id: randomUUID(),
					source: userId,
					target: work.outputElement!.name,
					label: work.outputInformation
				}
			}
		];
	});

	const nodes: ElementDefinition[] = Array.from(workElementNames as Set<string>).map((name) => ({
		data: {
			id: name,
			label: name
		}
	}));

	const elements: ElementDefinition[] = [
		{ data: { id: userId, label: 'あなた' } },
		...nodes,
		...edges
	];

	return { elements };
};
