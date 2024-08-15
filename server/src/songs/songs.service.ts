import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Song } from './songs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SongsDatabase } from 'src/models/songs.database';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { Like } from 'src/likes/likes.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectModel(Like.name) private readonly likesModel: Model<Like>,
    private jwtService: JwtService,
  ) {}
  async renderSongs() {
    await this.songModel.deleteMany({});
    const songsFromDb = await this.getAll();

    let songs = [];

    const songPromises = songsFromDb.map(async (song) => {
      const newSong = await this.songModel.create(song);
      console.log(newSong);
      return newSong;
    });

    songs = await Promise.all(songPromises);

    return songs;
  }

  async getAll(): Promise<Song[] | null> {
    return SongsDatabase;
  }

  async findAll(req: Request): Promise<Song[]> {
    const authorization = req.headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
      const bearer = authorization.split(' ')[1];

      const songs = await this.songModel.find({});
      const userData = await this.verifyToken(bearer);

      if (userData) {
        const songsWithLiked = await Promise.all(
          songs.map(async (song) => {
            const liked = await this.likesModel.findOne({
              userId: userData.id,
              songId: song._id,
            }).select({ updatedAt: 0, __v: 0 });

            return {
              ...song.toObject(),
              liked: !!liked,
            };
          }),
        );
        return songsWithLiked;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async verifyToken(token: string) {
    const encrypted = await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    return encrypted;
  }
}
