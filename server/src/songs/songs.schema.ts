import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Song {
  @Prop()
  name: string;

  @Prop()
  author: string;
  
  @Prop()
  album: string;

  @Prop()
  duration: number;
}

export const songModel = SchemaFactory.createForClass(Song);
