import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Playlist {
  @Prop({ default: [] })
  songs: Array<string>;

  @Prop()
  userId: string;

  @Prop()
  title: string;
}

export const playlistSchema = SchemaFactory.createForClass(Playlist);
