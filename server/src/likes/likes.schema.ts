import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Like {
  @Prop()
  userId: string;

  @Prop()
  songId: string;

  @Prop()
  title: string;
}

export const likeSchema = SchemaFactory.createForClass(Like)