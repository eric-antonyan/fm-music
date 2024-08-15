import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { SongsModule } from './songs/songs.module';
import { LikesModule } from './likes/likes.module';
import { PlaylistsModule } from './playlists/playlists.module';


@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      process.env.MONGO_URL
    ),
    PassportModule.register({ session: true }),
    AuthModule,
    SongsModule,
    LikesModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
