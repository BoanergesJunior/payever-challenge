import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop()
  userId: number;

  @Prop()
  image64: string;

  constructor(image?: Partial<Image>) {
    this.userId = image?.userId;
    this.image64 = image?.image64;
  }
}

export const ImageSchema = SchemaFactory.createForClass(Image);
