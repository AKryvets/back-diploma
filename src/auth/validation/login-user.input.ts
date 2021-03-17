import * as Joi from "@hapi/joi";
import { ApiPropertyOptional } from "@nestjs/swagger";

export const LoginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class LoginUserDto {
  @ApiPropertyOptional({ default: "" })
  readonly email: string;

  @ApiPropertyOptional({ default: "" })
  readonly password: string;
}
