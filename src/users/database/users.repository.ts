import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { GetUserDto } from "../dto/get-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "./users.schema";
import { UserUpdateModel } from "../validation/update-user.input";

@Injectable()
export class UsersRepository {
  constructor(@Inject("USER_MODEL") private userModel: Model<User>) {}

  async findOne(_id: string): Promise<GetUserDto> {
    return this.userModel.findOne({ _id }).lean();
  }

  async findOneByEmail(email: string): Promise<GetUserDto> {
    return this.userModel.findOne({ email }).lean();
  }

  async createUser({ email, password }: CreateUserDto): Promise<void> {
    const newUser = new this.userModel({ email, hash: password });

    await newUser.save();
  }

  updateUserByCond = async (
    condition: UpdateUserDto,
    updateModel: UserUpdateModel
  ) => {
    return this.userModel.updateOne(condition, { $set: updateModel });
  };
}
