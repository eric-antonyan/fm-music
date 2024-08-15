import { IsEmail, IsLowercase, IsStrongPassword } from 'class-validator';

export class AuthenticateUserDTO {
  @IsLowercase()
  @IsEmail({}, { message: 'Please enter valid email' })
  email: string;

  @IsStrongPassword()
  password: string;
}
