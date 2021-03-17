import { Mongoose } from "mongoose";
import { UsersSchema } from "./users.schema";

export const usersProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (mongoose: Mongoose) => mongoose.model("Users", UsersSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
