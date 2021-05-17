import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Tasks } from "./tasks.schema";
import {CreateTaskDto} from '../dto/create-task.dto';
import {UpdateTaskModel} from '../validation/update-task.input';

@Injectable()
export class TasksRepository {
  constructor(@Inject("TASK_MODEL") private tasksModel: Model<Tasks>) {}

  async findOne(_id: string): Promise<Tasks> {
    return this.tasksModel.findOne({ _id }).lean();
  }

  async createTask(createTaskModel: CreateTaskDto): Promise<void> {
    const newTask = new this.tasksModel(createTaskModel);

    await newTask.save();
  }

  async updateById(_id: string, updateModel: UpdateTaskModel): Promise<void> {
    await this.tasksModel.updateOne({ _id }, { $set: updateModel });
  }

  async getAll(limit, skip, filterParams = {}): Promise<Tasks[]> {
    return this.tasksModel.find(filterParams).skip(skip).limit(limit);
  }

}
