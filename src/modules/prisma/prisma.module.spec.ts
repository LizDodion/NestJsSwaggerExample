import { LoggerModule } from '@api-core/modules/logger/logger.module';
import { ConfigModule } from '@api-core/modules/config/config.module';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrismaModule', () => {
  it('should import providers and modules', () => {
    const imports = Reflect.getMetadata('imports', PrismaModule);
    const exports = Reflect.getMetadata('exports', PrismaModule);
    const providers = Reflect.getMetadata('providers', PrismaModule);

    expect(imports).toStrictEqual([ConfigModule, LoggerModule]);
    expect(providers).toStrictEqual([PrismaService]);
    expect(exports).toStrictEqual([PrismaService]);
  });
});
