import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserDTO } from 'src/dto/authenticateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  }

  async create(createUserDto: CreateUserDTO): Promise<unknown> {
    const isExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isExist) {
      throw new BadRequestException({
        message: `${isExist.email} already exists`,
        success: false,
      });
    } else {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      await this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      });

      return {
        message: 'You successfully registered!',
        success: true,
      };
    }
  }

  async login(authenticateUserDto: AuthenticateUserDTO) {
    const isExist = await this.userModel.findOne({
      email: authenticateUserDto.email,
    });
    if (isExist) {
      const isPasswordValid = await bcrypt.compare(
        authenticateUserDto.password,
        isExist.password,
      );
      if (!isPasswordValid) {
        throw new NotFoundException({
          errors: 'Password is incorrect',
          success: false,
        });
      }
    } else {
      throw new NotFoundException({
        errors: ['This account not found'],
        success: false,
      });
    }

    const accessToken = await this.jwtService.signAsync({ id: isExist.id });

    return {
      message: 'You successfully logged in',
      access_token: accessToken,
      success: true,
    };
  }

  async authenticate(
    access_token: string,
  ): Promise<User | { message: string; success: boolean }> {
    if (!access_token) {
      throw new NotFoundException({
        message: 'Access token not found',
        success: false,
      });
    }

    try {
      const decryptedData = await this.jwtService.verify(access_token);
      const user = await this.userModel.findById(decryptedData.id);
      if (user) {
        return user;
      } else {
        throw new NotFoundException({
          message: 'User has deleted',
          success: false,
        });
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Invalid access token',
        success: false,
      });
    }
  }
}
