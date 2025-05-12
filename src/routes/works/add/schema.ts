import { m } from '$lib/paraglide/messages';
import { IsNotEmpty, IsNumberString, IsString, MaxLength } from 'class-validator';
export class AddWorkSchema {
	@IsNumberString()
	@IsNotEmpty({ message: () => m.error_not_selected({ name: m.work_input_element() }) })
	inputElementId: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_empty({ name: m.work_input_information() }) })
	@MaxLength(100, {
		message: () => m.error_max_length({ name: m.work_input_information(), length: 100 })
	})
	inputInformation: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_empty({ name: m.work_description() }) })
	@MaxLength(200, {
		message: () => m.error_max_length({ name: m.work_name(), length: 200 })
	})
	workDescription: string = '';

	@IsNumberString()
	@IsNotEmpty({ message: () => m.error_not_selected({ name: m.work_output_element() }) })
	outputElementId: string = '';

	@IsString()
	@IsNotEmpty({ message: () => m.error_empty({ name: m.work_output_information() }) })
	@MaxLength(100, {
		message: () => m.error_max_length({ name: m.work_output_information(), length: 100 })
	})
	outputInformation: string = '';
}

export const schema = AddWorkSchema;
