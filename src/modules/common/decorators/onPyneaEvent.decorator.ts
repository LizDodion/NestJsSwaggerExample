import { extendArrayMetadata } from '@nestjs/common/utils/extend-metadata.util';
import { OnEventMetadata, OnEventType } from '@nestjs/event-emitter';
import { EVENT_LISTENER_METADATA } from '@nestjs/event-emitter/dist/constants';
import { OnEventOptions } from '@nestjs/event-emitter/dist/interfaces';
import { Inject } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';

interface DecoratorFactoryFunctionParams {
  injectLogger: PropertyDecorator & ParameterDecorator;
  event: OnEventType;
  options?: OnEventOptions;
}

interface onPyneaEventDescriptor extends PropertyDescriptor {
  logger?: LoggerService;
}

export const decoratorFactoryFn = ({
  injectLogger,
  event,
  options,
}: DecoratorFactoryFunctionParams) => {
  return (
    target: object,
    key?: any,
    descriptor?: onPyneaEventDescriptor,
  ): onPyneaEventDescriptor => {
    injectLogger(target, 'logger');
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]): Promise<any> {
      this.logger.log('Event Received', {
        handler: this.constructor.name,
        eventName: event.toString(),
        ...args[0],
      });
      return await originalMethod.apply(this, args);
    };

    extendArrayMetadata(
      EVENT_LISTENER_METADATA,
      [{ event, options } as OnEventMetadata],
      descriptor.value,
    );

    return descriptor;
  };
};

export const OnPyneaEventFn =
  (decoratorFactoryFn) =>
  (event: OnEventType, options?: OnEventOptions): MethodDecorator => {
    const injectLogger = Inject(LoggerService);
    const decoratorFactory = decoratorFactoryFn({
      injectLogger,
      event,
      options,
    });
    decoratorFactory.KEY = EVENT_LISTENER_METADATA;
    return decoratorFactory;
  };

export const OnPyneaEvent = OnPyneaEventFn(decoratorFactoryFn);
