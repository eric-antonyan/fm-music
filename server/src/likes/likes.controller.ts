import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AddLikeDTO } from 'src/dto/addLikes.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get("")
  getById(@Req() req: Request) {
    return this.likesService.getLikesById(req)
  }

  @Post('')
  @UsePipes(new ValidationPipe)
  like(@Body() likeDto: AddLikeDTO) {
    return this.likesService.addLike(likeDto);
  }

  
}
