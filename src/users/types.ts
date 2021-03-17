import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly email: string;
  readonly hash: string;
  readonly nickname: string;
  readonly lastName: string;
  readonly firstName: string;
}

export class UserUpdateModel {
  nickname?: string;
  lastName?: string;
  firstName?: string;
}

export class UserUpdateParams {
  id: string;
}
