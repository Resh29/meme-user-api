import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from './user.options';
import { IsEmail, Length } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
  password: string;
}
