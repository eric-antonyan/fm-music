import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, playlistSchema } from './playlists.schema';

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeature([
      {
        name: Playlist.name,
        schema: playlistSchema,
      },
    ]),
  ],
})
export class PlaylistsModule {}
