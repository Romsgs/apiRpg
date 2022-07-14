import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ISignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
}

export class ISignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
}
