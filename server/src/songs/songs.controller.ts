import { Controller, Get, Req } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {
  }

  @Get('')
  async findAll(@Req() req: Request) {
    return await this.songsService.findAll(req as Request)
  }

  @Get('render')
  async renderSongs() {
    return await this.songsService.renderSongs()
  }
}
