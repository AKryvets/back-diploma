import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './validation/login-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'Email or password is not correct',
      });
    }

    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async register(user: CreateUserDto) {
    const wasCreated = await this.usersService.createUser(user);

    if (wasCreated) {
      return await this.usersService.findOneByEmail(user.email);
    }
  }
}
