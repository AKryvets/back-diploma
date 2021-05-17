import * as Joi from "@hapi/joi";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {Questions} from '../database/tasks.schema';

export const UpdateTaskSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  creatorId: Joi.string(),
  type: Joi.string(),
  questions: Joi.array().items({
    title:  Joi.string(),
    order:  Joi.number(),
    type:  Joi.string(),
    options: Joi.array().items({
      title: Joi.string(),
      value: Joi.string(),
    })
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
}

export class UpdateTaskParams {
  @ApiProperty({ required: true })
  id: string;
}
