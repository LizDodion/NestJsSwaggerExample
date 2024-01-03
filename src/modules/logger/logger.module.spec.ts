import { ConfigModule } from '@api-core/modules/config/config.module';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';

describe('LoggerModule', () => {
  it('should import providers and modules', () => {
    const keys = Reflect.getMetadataKeys(LoggerModule);
    expect(keys).toEqual([
      'imports',
      'providers',
      'exports',
      '__module:global__',
    ]);

    const imports = Reflect.getMetadata('imports', LoggerModule);
    const providers = Reflect.getMetadata('providers', LoggerModule);
    const exports = Reflect.getMetadata('providers', LoggerModule);

    expect(imports).toStrictEqual([ConfigModule]);
    expect(providers).toStrictEqual([LoggerService]);
    expect(exports).toStrictEqual([LoggerService]);
  });
});
