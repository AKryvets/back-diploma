import { ApiProperty } from "@nestjs/swagger";

export class UserGetParamsDto {
  @ApiProperty({ required: true })
  id: string;
}
