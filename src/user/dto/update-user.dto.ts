import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Types } from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  files?: Types.ObjectId[];
}
