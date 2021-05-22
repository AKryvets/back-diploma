import * as Joi from "@hapi/joi";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {Questions} from '../database/tasks.schema';

export const UpdateTaskSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  creatorId: Joi.string(),
  type: Joi.string(),
  linkForCheck: Joi.string(),
  numberOfAttempts: Joi.number(),
  timeLimit: Joi.number(),
  showAnswers: Joi.boolean(),
  questions: Joi.array().items({
    title:  Joi.string(),
    order:  Joi.number(),
    type:  Joi.string(),
    answers: Joi.array(),
    options: Joi.array(),
  }),
});

export class UpdateTaskModel {
  @ApiPropertyOptional({ default: "" })
  title?: string;

  @ApiPropertyOptional({ default: "" })
  description?: string;

  @ApiPropertyOptional({ default: "" })
  creatorId?: string;

  @ApiPropertyOptional({ default: "" })
  type?: string;

  @ApiPropertyOptional({ default: "" })
  questions?: Questions[];

  @ApiPropertyOptional({ default: "" })
  linkForCheck?: string;

  @ApiPropertyOptional({ default: "" })
  numberOfAttempts?: number;

  @ApiPropertyOptional({ default: "" })
  timeLimit?: number;

  @ApiPropertyOptional({ default: "" })
  showAnswers?: boolean;
}

export class UpdateTaskParams {
  @ApiProperty({ required: true })
  id: string;
}
