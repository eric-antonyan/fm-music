import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDTO } from 'src/dto/createPlaylist.dto';
import { AddToPlaylistsDTO } from 'src/dto/addToPlaylists.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createPlaylist(
    @Req() req: Request,
    @Body() createPlaylistDto: CreatePlaylistDTO
  ) {
    return this.playlistsService.createPlaylist(req, createPlaylistDto)
  }

  @Get()
  getPlaylistsByUser(@Req() req: Request) {
    return this.playlistsService.getPlaylistsByUser(req)
  } 

  @Post(':identificator')
  addToPlaylist(@Param('identificator') identificator: string, @Body() addToPlaylistsDTO: AddToPlaylistsDTO ) {
    return this.playlistsService.addToPlaylist(identificator, addToPlaylistsDTO)
  }

  @Get(':identificator')
  fetchById(@Param("identificator") identificator: string) {
    return this.playlistsService.fetchById(identificator);
  }
}
