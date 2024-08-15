import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { jwtConstants } from 'src/constants';
import { CreatePlaylistDTO } from 'src/dto/createPlaylist.dto';
import { Playlist } from './playlists.schema';
import { AddToPlaylistsDTO } from 'src/dto/addToPlaylists.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Playlist.name)
    private readonly playlistsModel: Model<Playlist>,
  ) {}
  async createPlaylist(req: Request, createPlaylistDto: CreatePlaylistDTO) {
    const authorization = req.headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.split(' ')[1];
      const userData: { id: string } = await this.verifyToken(token);

      if (userData) {
        const playlist = new this.playlistsModel({
          title: createPlaylistDto.title,
          userId: userData.id,
        });
        const newPlaylist = await playlist.save();
        return newPlaylist;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async getPlaylistsByUser(req: Request) {
    const authorization = req.headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.split(' ')[1];
      const userData: { id: string } = await this.verifyToken(token);

      if (userData) {
        const playlists = await this.playlistsModel.find({
          userId: userData.id,
        });
        return playlists;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async addToPlaylist(playlistId: string, addToPlaylistsDTO: AddToPlaylistsDTO) {
    const playlist = await this.playlistsModel.findById(playlistId).exec();
    const custom = [...playlist.songs, addToPlaylistsDTO.songId]
    console.log(custom);
    const isExist = playlist.songs.find((song) => song === addToPlaylistsDTO.songId)
    if (!isExist) {
        await this.playlistsModel.updateOne({_id: playlist._id}, {songs: custom})
    }
  }

  async fetchById(identificator: string) {
    const playlist = this.playlistsModel.findOne({_id: identificator})
    console.log(identificator);
    

    return playlist;
  }

  async verifyToken(token: string) {
    const encrypted = await this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    return encrypted;
  }
}
