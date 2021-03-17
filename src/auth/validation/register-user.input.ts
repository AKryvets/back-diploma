import * as Joi from '@hapi/joi';

export const RegisterUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class RegisterUserDto {
  readonly password: string;
  readonly email: string;
}
