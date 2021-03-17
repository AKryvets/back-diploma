import * as mongoose from 'mongoose';
import validator from 'validator';

export const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: (value: string) => {
      return validator.isEmail(value);
    },
  },
  nickname: String,
  lastName: String,
  firstName: String,
  hash: String,
});
