import "reflect-metadata";
import { transformToInstance } from "@api-core/modules/common/utils/transformToInstance";
export function SanitiseResponse<T>(
  type: new (...args: any[]) => T
): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): T | Promise<T> {
      const result = originalMethod.apply(this, args);

      // Check if result is a Promise. Otherwise if a service calls another service it gets into issues.
      if (result instanceof Promise) {
        // If it's a Promise, use .then() to transform the result
        return result.then((res) => transformToInstance(type, res));
      } else {
        // If it's not a Promise, transform the result directly
        return transformToInstance(type, result);
      }
    };
    Reflect.defineMetadata("SanitiseResponse", type, target, propertyKey);

    return descriptor;
  };
}
