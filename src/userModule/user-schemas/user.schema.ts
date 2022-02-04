import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MemeObject = {
  url: string;
  id: string;
  title: string;
  author: string;
};

import { Document } from 'mongoose';

@Schema()
export class User {
  [x: string]: any;
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  token: string;
  @Prop()
  memesCollection: Array<MemeObject>;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
