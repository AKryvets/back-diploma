import {IsEmail, IsNumber, IsString} from "class-validator";

export class GetUserDto {
  @IsString()
  _id: string;

  @IsEmail()
  email: string;

  @IsString()
  hash: string;

  @IsString()
  nickname: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;
}
