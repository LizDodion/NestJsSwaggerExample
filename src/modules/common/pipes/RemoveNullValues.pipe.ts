import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class RemoveNullValuesPipe implements PipeTransform {
  transform(
    value: Record<any, any>,
    metadata: ArgumentMetadata,
  ): Record<any, any> {
    if (value && typeof value === 'object') {
      // Filter out null properties from the object
      const cleanedValue = {};
      for (const key in value) {
        if (value[key] !== null && value[key] !== undefined) {
          cleanedValue[key] = value[key];
        }
      }
      return cleanedValue;
    }
    return value;
  }
}
