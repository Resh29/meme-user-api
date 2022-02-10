import { MemeObject } from '../user-schemas/user.schema';

export class ReturnUserDto {
  name: string;
  memesCollection?: Array<MemeObject>;
  id: string;
  token: string;
}
