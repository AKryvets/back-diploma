import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Get, Query, Delete,
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JoiValidationPipe } from "../common/pipes/validation.pipe";
import {
  CreateTaskModel,
  CreateTaskSchema,
} from "./validation/create-task.input";
import { GetTaskParams } from "./validation/get-task.input";
import {
  UpdateTaskModel,
  UpdateTaskSchema,
} from "./validation/update-task.input";
import {GetTasksDto, GetTasksSchema} from './validation/get-tasks.input';

@ApiTags("tasks")
@Controller("tasks")
export class UserController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: "Get task" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(":id")
  getTask(@Param() { id }: GetTaskParams) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: "Create task" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("create")
  createTask(
    @Request() req,
    @Body(new JoiValidationPipe(CreateTaskSchema)) body: CreateTaskModel
  ) {
    return this.tasksService.createTask(body, req.user._id);
  }

  @ApiOperation({ summary: "Update task" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateTask(
    @Param() { id }: GetTaskParams,
    @Body(new JoiValidationPipe(UpdateTaskSchema)) body: UpdateTaskModel
  ) {
    return this.tasksService.updateById(id, body);
  }

  @ApiOperation({ summary: "Get tasks" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  getTasks(
    @Request() req,
    @Query(new JoiValidationPipe(GetTasksSchema)) params: GetTasksDto
  ) {
    return this.tasksService.getTasks(params, req.user._id);
  }

  @ApiOperation({ summary: "Delete task" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteTask(
    @Param() { id }: GetTaskParams
  ) {
    return this.tasksService.deleteById(id);
  }
}
