import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteWorkSchema {
	@IsNumberString()
	@IsNotEmpty()
	id: string = '';
}
