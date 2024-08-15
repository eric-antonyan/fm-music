import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/createUser.dto';
import { AuthenticateUserDTO } from 'src/dto/authenticateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDTO) {
    console.log(createUserDto);

    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() authenticateUserDto: AuthenticateUserDTO) {
    console.log(authenticateUserDto);

    return this.usersService.login(authenticateUserDto);
  }

  @Post('/authenticate')
  authenticateUser(@Body() requestBody: { access_token: string }) {
    return this.usersService.authenticate(requestBody.access_token);
  }
}
