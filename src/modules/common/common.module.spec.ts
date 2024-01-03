import { CommonModule } from './common.module';
import { MathUtils } from './utils/math.utils';

describe('CommonModule', () => {
  it('should have been defined correctly with the correct imports, providers and exports', async () => {
    // Check we have all the correct keys
    const keys = Reflect.getMetadataKeys(CommonModule);
    expect(keys).toEqual(['providers', 'exports', '__module:global__']);

    // Check that it has the global decorator
    const global = Reflect.getMetadata('__module:global__', CommonModule);
    expect(global).toBe(true);

    // Check it has the correct providers
    const providers = Reflect.getMetadata('providers', CommonModule);
    expect(providers).toBeDefined();
    expect(providers.length).toEqual(1);
    expect(providers).toContain(MathUtils);

    // Check the exports are correct
    const exports = Reflect.getMetadata('exports', CommonModule);
    expect(exports.length).toBe(1);
    expect(exports).toContain(MathUtils);
  });
});
