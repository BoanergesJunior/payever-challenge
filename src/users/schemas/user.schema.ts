import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  avatar: string;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.email = user?.email;
    this.first_name = user?.first_name;
    this.last_name = user?.last_name;
    this.avatar = user?.avatar;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
