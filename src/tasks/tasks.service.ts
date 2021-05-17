import { Injectable } from "@nestjs/common";
import { TasksRepository } from "./database/tasks.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Tasks } from "./database/tasks.schema";
import { GetTasksDto } from "./validation/get-tasks.input";

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async findOne(id: string): Promise<Tasks> {
    return await this.tasksRepository.findOne(id);
  }

  async createTask(task: CreateTaskDto, userId: string): Promise<boolean> {
    await this.tasksRepository.createTask({
      ...task,
      creatorId: userId,
    });

    return true;
  }

  async updateById(id: string, updateModel): Promise<Tasks> {
    await this.tasksRepository.updateById(id, updateModel);

    return this.findOne(id);
  }

  async getTasks(params: GetTasksDto): Promise<Tasks[]> {
    const { limit, skip, creatorId } = params;
    const filters = {};

    if (creatorId) filters["creatorId"] = creatorId;

    return await this.tasksRepository.getAll(limit, skip, filters);
  }
}
