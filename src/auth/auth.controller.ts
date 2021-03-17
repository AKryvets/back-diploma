import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginUserSchema } from './validation/login-user.input';
import {
  RegisterUserDto,
  RegisterUserSchema,
} from './validation/register-user.input';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new JoiValidationPipe(LoginUserSchema)) body: LoginUserDto,
  ) {
    return this.authService.login(body);
  }

  @Post('/register')
  async register(
    @Body(new JoiValidationPipe(RegisterUserSchema)) body: RegisterUserDto,
  ) {
    return await this.authService.register(body);
  }
}
