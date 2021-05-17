import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { UserController } from "./tasks.controller";
import { tasksProviders } from "./database/tasks.providers";
import { DatabaseModule } from "../database/database.module";
import { TasksRepository } from "./database/tasks.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [TasksService, TasksRepository, ...tasksProviders],
  exports: [TasksService, TasksRepository],
})
export class TasksModule {}
