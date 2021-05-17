import { Mongoose } from "mongoose";
import { TasksSchema } from "./tasks.schema";

export const tasksProviders = [
  {
    provide: "TASK_MODEL",
    useFactory: (mongoose: Mongoose) => mongoose.model("Tasks", TasksSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
