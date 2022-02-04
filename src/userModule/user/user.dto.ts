import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from './user.options';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { MemeObject } from '../user-schemas/user.schema';

export class UserDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  password: string;
  memesCollection: Array<MemeObject>;
  token: string;
  id: string;
}
