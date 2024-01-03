import { SanitiseResponse } from '@api-core/modules/common/decorators/sanitiseResponse.decorator';
import { Controller, Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { transformToInstance } from '@pynea/utils';

jest.mock('@pynea/utils', () => {
  return {
    ...jest.requireActual('@pynea/utils'), // Keep the real implementations for other functions in 'utils'
    transformToInstance: jest.fn(),
  };
});
describe('SanitiseResponseOutput', () => {
  it('if I add as a decorator, it should call transformToInstance', async () => {
    class test {
      @Expose()
      some: string;

      shouldBeRemoved: number;
    }

    @Injectable()
    class MyService {
      constructor() {}

      @SanitiseResponse(test)
      getData(): { some: string; shouldBeRemoved: number } {
        const data = { some: 'someText', shouldBeRemoved: 1 };
        return data;
      }
    }

    @Controller()
    class MyController {
      constructor(private readonly myService: MyService) {}

      decoratedMethod(): { some: string; shouldBeRemoved: number } {
        return this.myService.getData();
      }
    }

    const myService = new MyService();
    const mockClass4 = new MyController(myService);
    await mockClass4.decoratedMethod();
    // Expect that the mock function was called as expected
    expect(transformToInstance).toHaveBeenCalledWith(test, {
      some: 'someText',
      shouldBeRemoved: 1,
    });
  });
});
