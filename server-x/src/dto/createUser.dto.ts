import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Please fill field' })
  @IsString()
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Please enter valid email' })
  email: string;

  @IsString()
  @IsStrongPassword(
    { minLength: 8 },
    { message: 'Please enter strong password example' },
  )
  @IsString()
  password: string;
}