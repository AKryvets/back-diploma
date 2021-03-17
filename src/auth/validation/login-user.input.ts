import * as Joi from '@hapi/joi';

export const LoginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class LoginUserDto {
  readonly password: string;
  readonly email: string;
}
