import * as Joi from "@hapi/joi";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export const UpdateUserSchema = Joi.object().keys({
  nickname: Joi.string(),
  lastName: Joi.string(),
  firstName: Joi.string(),
  age: Joi.string(),
});

export class UserUpdateModel {
  @ApiPropertyOptional({ default: "" })
  nickname?: string;

  @ApiPropertyOptional({ default: "" })
  lastName?: string;

  @ApiPropertyOptional({ default: "" })
  firstName?: string;

  @ApiPropertyOptional({ default: "" })
  age?: number;
}

export class UserUpdateParams {
  @ApiProperty({ required: true })
  id: string;
}
