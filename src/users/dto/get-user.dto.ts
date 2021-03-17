import { IsEmail, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  _id: string;

  @IsEmail()
  email: string;

  @IsString()
  hash: string;
}
