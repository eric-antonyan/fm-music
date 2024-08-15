import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userModel.findOne({ email: details.email });

    if (user) return user;
    console.log('user not found, creating...');

    const newUser = await this.userModel.create(details);

    return newUser;
  }

  async findUser(id: string) {
    const user = await this.userModel.findOne({ googleId: id });
    console.log('user', user);
    return user;
  }
}
