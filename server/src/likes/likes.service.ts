import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './likes.schema';
import { Model } from 'mongoose';
import { AddLikeDTO } from 'src/dto/addLikes.dto';
import { User } from 'src/users/users.schema';
import { Song } from 'src/songs/songs.schema';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likesModel: Model<Like>,
    @InjectModel(User.name) private readonly usersModel: Model<User>,
    @InjectModel(Song.name) private readonly songsModel: Model<Song>,
    private jwtService: JwtService,
  ) {}
  async addLike(addLikeDto: AddLikeDTO) {
    const { songId, userId } = addLikeDto;

    const isExistSongId = await this.songsModel.findById(songId);
    const isExistUserId = await this.usersModel.findById(userId);

    console.log(isExistSongId);
    console.log(isExistUserId);

    if (!isExistUserId && !isExistSongId) {
      throw new HttpException(
        {
          errors: ['songId and userId not exist'],
        },
        404,
      );
    } else if (!isExistSongId) {
      throw new HttpException(
        {
          errors: ['songId not exist'],
        },
        404,
      );
    } else if (!isExistUserId) {
      throw new HttpException(
        {
          errors: ['userId not exist'],
        },
        404,
      );
    } else {
      const isExist = await this.likesModel.findOne({
        songId: isExistSongId._id,
        userId: isExistUserId._id,
      });
      if (isExist) {
        await this.likesModel.deleteOne({
          songId: isExist.songId,
          userId: isExist.userId,
        });
        return {
          errors: ['Removed from favorites'],
          message: 'Removed from favorites',
          data: {},
        };
      } else {
        const newLike = new this.likesModel(addLikeDto);
        await newLike.save();
        return {
          errors: [],
          message: 'Added to favorites!',
          data: newLike,
        };
      }
    }
  }

  async verifyToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
  }

  async getLikesById(req: Request) {
    try {
      const authorization = req.headers['authorization']?.split(' ');
      if (!authorization || authorization.length < 2) {
        throw new HttpException('Authorization header is missing', 401);
      }
      const bearer = authorization[1];

      const encrypted = await this.verifyToken(bearer);

      const userData = await this.usersModel.findById(encrypted.id);
      if (!userData) {
        throw new NotFoundException('User not found');
      }

      const findAll = await this.likesModel.find({ userId: userData._id });

      const songs = await Promise.all(
        findAll.map(async (like) => {
          const song = await this.songsModel.findById(like.songId);
          if (!song) {
            // Handle the case where the song is not found
            return null;
          }
          return song;
        }),
      );

      // Filter out null values from songs
      const validSongs = songs.filter((song) => song !== null);

      const songsWithLiked = await Promise.all(
        validSongs.map(async (song) => {
          const liked = await this.likesModel.findOne({
            userId: userData._id,
            songId: song._id,
          });
          return {
            ...song.toObject(),
            liked: !!liked,
          };
        }),
      );

      return songsWithLiked;
    } catch (error) {
      // Handle errors and log them as needed
      console.error(error);
      throw new HttpException('Internal server error', 500);
    }
  }
}
