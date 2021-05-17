import { Injectable } from "@nestjs/common";
import { TasksRepository } from "./database/tasks.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Tasks } from "./database/tasks.schema";
import { GetTasksDto } from "./validation/get-tasks.input";
import {TaskTypes} from './database/tasks.enums';

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

  async deleteById(id: string): Promise<Tasks> {
    return await this.tasksRepository.deleteOne(id);
  }

  async getTasks(params: GetTasksDto, id: string): Promise<Tasks[]> {
    const { limit, skip, creatorId, search, practical, tests } = params;
    const filters = {};

    if (creatorId && creatorId !== 'false') filters["creatorId"] = creatorId === 'true'? id : creatorId;
    if (search) filters["title"] = new RegExp(search, "i");
    if (tests) filters["type"] = TaskTypes.Test;
    if (practical) filters["type"] = TaskTypes.Practical;

    return await this.tasksRepository.getAll(limit, skip, filters);
  }
}
