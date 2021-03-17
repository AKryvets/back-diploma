import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const result = this.schema.validate(value);
    if (result.error) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
