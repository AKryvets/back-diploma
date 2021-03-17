import {
  Controller,
  Request,
  UseGuards,
  Get,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { UpdateUserSchema } from './validation/update-user.input';
import { UserUpdateModel, UserUpdateParams } from './types';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUserById(
    @Param() { id }: UserUpdateParams,
    @Body(new JoiValidationPipe(UpdateUserSchema)) body: UserUpdateModel,
  ) {
    return this.usersService.updateUserById(id, body);
  }
}
