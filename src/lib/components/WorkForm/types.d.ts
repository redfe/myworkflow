import type { Infer, SuperValidated } from 'sveltekit-superforms';
import type { WorkSchema } from './schema';

type WorkElement = {
	id: number;
	name: string;
};

export type WorkFormProps = {
	type: 'register' | 'update';
	data: { form: SuperValidated<Infer<typeof WorkSchema>>; workElements: WorkElement[] };
};
