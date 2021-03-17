import * as Joi from "@hapi/joi";
import { ApiPropertyOptional } from "@nestjs/swagger";

export const RegisterUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class RegisterUserDto {
  @ApiPropertyOptional({ default: "" })
  readonly email: string;

  @ApiPropertyOptional({ default: "" })
  readonly password: string;
}
