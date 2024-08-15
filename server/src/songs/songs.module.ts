import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, songModel } from './songs.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { Like, likeSchema } from 'src/likes/likes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Song.name, schema: songModel},
    ]),
    MongooseModule.forFeature([
      {name: Like.name, schema: likeSchema},
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    })
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
