import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./database/users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import * as bcrypt from "bcrypt";
import { UserUpdateModel } from "./validation/update-user.input";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(id: string): Promise<GetUserDto> {
    return await this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<GetUserDto> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async createUser({ email, password }: CreateUserDto): Promise<boolean> {
    const isAlreadyCreated = await this.findOneByEmail(email);

    if (isAlreadyCreated) {
      throw new BadRequestException({
        message: "User with this email is already registered",
      });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    await this.usersRepository.createUser({ email, password: hash });
    return true;
  }

  updateUserById = async (id: string, updateModel: UserUpdateModel) => {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException({ message: "User not found" });
    }

    await this.usersRepository.updateUserByCond({ _id: id }, updateModel);
    return await this.usersRepository.findOne(id);
  };

  getUserById = async (id: string) => {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException({ message: "User not found" });
    }

    return user;
  };

  getVerificationStatus = async (user: GetUserDto) => {
    return {
      isPersonalDataFilled: await this.validateUser(user._id)
    };
  };

  validateUser = async (id: string) => {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException({ message: "User not found" });
    }

    const { email, nickname, age, firstName, lastName } = user;

    return Boolean(email && nickname && age && firstName && lastName);
  };
}
