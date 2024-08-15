import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from './likes.schema';
import { Song, songModel } from 'src/songs/songs.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Like.name,
        schema: likeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Song.name,
        schema: songModel,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
