import * as Joi from '@hapi/joi';

export const UpdateUserSchema = Joi.object().keys({
  nickname: Joi.string(),
  lastName: Joi.string(),
  firstName: Joi.string(),
});
