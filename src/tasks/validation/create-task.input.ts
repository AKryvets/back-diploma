import * as Joi from "@hapi/joi";
import { ApiPropertyOptional } from "@nestjs/swagger";

export const CreateTaskSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  linkForCheck: Joi.string(),
  numberOfAttempts: Joi.number(),
  timeLimit: Joi.number(),
  showAnswers: Joi.boolean(),
});

export class CreateTaskModel {
  @ApiPropertyOptional({ default: "" })
  title: string;

  @ApiPropertyOptional({ default: "" })
  description: string;

  @ApiPropertyOptional({ default: "" })
  type: string;

  @ApiPropertyOptional({ default: "" })
  linkForCheck?: string;

  @ApiPropertyOptional({ default: "" })
  numberOfAttempts?: number;

  @ApiPropertyOptional({ default: "" })
  timeLimit?: number;

  @ApiPropertyOptional({ default: "" })
  showAnswers?: boolean;
}
