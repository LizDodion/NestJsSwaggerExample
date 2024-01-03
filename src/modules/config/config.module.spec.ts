import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

describe('ConfigModule', () => {
  it('should have been defined correctly with the correct decorators', async () => {
    // Check we have all the correct keys
    const keys = Reflect.getMetadataKeys(ConfigModule);
    expect(keys).toEqual(['providers', 'exports', '__module:global__']);

    // Check that it has the global decorator
    const global = Reflect.getMetadata('__module:global__', ConfigModule);
    expect(global).toBe(true);

    // Check it has the correct providers
    const providers = Reflect.getMetadata('providers', ConfigModule);
    expect(providers).toBeDefined();
    expect(providers).toEqual([ConfigService]);

    // Check the exports are correct
    const exports = Reflect.getMetadata('exports', ConfigModule);
    expect(exports).toEqual([ConfigService]);
  });
});
