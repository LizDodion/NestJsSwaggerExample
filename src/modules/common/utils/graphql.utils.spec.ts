import { DecoratorType } from './graphql.utils';

describe('GraphQL Utils', () => {
  describe('DecoratorType', () => {
    it('should simply return a function that returns provided argument', () => {
      class TestThing {
        testProp = 'test';
      }

      expect(DecoratorType(TestThing)()).toEqual(TestThing);
    });
  });
});
