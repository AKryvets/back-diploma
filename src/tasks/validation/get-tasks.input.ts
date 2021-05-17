import * as Joi from "@hapi/joi";
import { ApiPropertyOptional } from "@nestjs/swagger";

export const GetTasksSchema = Joi.object().keys({
  limit: Joi.number().integer().positive().default(20),
  skip: Joi.number().integer().positive().allow(0).default(0),
  creatorId: Joi.string(),
});

export class GetTasksDto {
  @ApiPropertyOptional({ default: 20 })
  readonly limit: number;

  @ApiPropertyOptional({ default: 0 })
  readonly skip: number;

  @ApiPropertyOptional()
  readonly creatorId: string;
}
