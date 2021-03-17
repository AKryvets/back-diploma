import * as mongoose from "mongoose";
import validator from "validator";
import { Document } from "mongoose";

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

export interface User extends Document {
  readonly _id: string;
  readonly email: string;
  readonly hash: string;
  readonly nickname: string;
  readonly lastName: string;
  readonly firstName: string;
}
