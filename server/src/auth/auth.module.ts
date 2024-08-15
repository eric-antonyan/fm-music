import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSerializer } from './utils/serialize.session';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersService, SessionSerializer],
})
export class AuthModule {}
