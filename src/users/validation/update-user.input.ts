import * as Joi from "@hapi/joi";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export const UpdateUserSchema = Joi.object().keys({
  nickname: Joi.string(),
  lastName: Joi.string(),
  firstName: Joi.string(),
});

export class UserUpdateModel {
  @ApiPropertyOptional({ default: "" })
  nickname?: string;

  @ApiPropertyOptional({ default: "" })
  lastName?: string;

  @ApiPropertyOptional({ default: "" })
  firstName?: string;
}

export class UserUpdateParams {
  @ApiProperty({ required: true })
  id: string;
}
