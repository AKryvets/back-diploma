import * as Joi from "@hapi/joi";
import { ApiPropertyOptional } from "@nestjs/swagger";

export const CreateTaskSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
});

export class CreateTaskModel {
  @ApiPropertyOptional({ default: "" })
  title: string;

  @ApiPropertyOptional({ default: "" })
  description: string;

  @ApiPropertyOptional({ default: "" })
  type: string;
}