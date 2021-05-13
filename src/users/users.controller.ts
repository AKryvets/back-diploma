import {
  Controller,
  Request,
  UseGuards,
  Get,
  Body,
  Put,
  Param,
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UsersService } from "./users.service";
import { JoiValidationPipe } from "../common/pipes/validation.pipe";
import {
  UpdateUserSchema,
  UserUpdateModel,
  UserUpdateParams,
} from "./validation/update-user.input";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserGetParamsDto } from "./validation/get-user.input";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Get profile" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: "Update user by id" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(":id")
  updateUserById(
    @Param() { id }: UserUpdateParams,
    @Body(new JoiValidationPipe(UpdateUserSchema)) body: UserUpdateModel
  ) {
    return this.usersService.updateUserById(id, body);
  }

  @ApiOperation({ summary: "Is user personal data confirmed?" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("verification-status")
  validateUser(@Request() req) {
    return this.usersService.getVerificationStatus(req.user);
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getUserById(@Param() { id }: UserGetParamsDto) {
    return this.usersService.getUserById(id);
  }
}
