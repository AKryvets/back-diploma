import {ApiProperty} from '@nestjs/swagger';

export class GetTaskParams {
  @ApiProperty({ required: true })
  id: string;
}