import { m } from '$lib/paraglide/messages';
import { IsNotEmpty, IsString } from 'class-validator';

class AddWorkSchema {
	@IsString()
	@IsNotEmpty({ message: () => m.error_not_selected({ name: m.work_input_element() }) })
	inputElement: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_empty({ name: m.work_input_information() }) })
	inputInformation: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_empty({ name: m.work_name() }) })
	workName: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_not_selected({ name: m.work_output_element() }) })
	outputElement: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_empty({ name: m.work_output_information() }) })
	outputInformation: string = '';
}

export const schema = AddWorkSchema;
