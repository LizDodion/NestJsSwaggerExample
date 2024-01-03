import { ConfigModule } from '../config/config.module';
import { PyneaAdminModule } from './pyneaAdmin.module';
import { SlackService } from './services/slackWebhook.service';
import { slackWebookFactory } from './factories/slackWebhook.factory';

describe('AdminTokenModule', () => {
  it('should import providers and modules', () => {
    const imports = Reflect.getMetadata('imports', PyneaAdminModule);
    const providers = Reflect.getMetadata('providers', PyneaAdminModule);
    const exports = Reflect.getMetadata('exports', PyneaAdminModule);

    expect(imports).toStrictEqual([ConfigModule]);
    expect(providers).toStrictEqual([SlackService, slackWebookFactory]);
    expect(exports).toStrictEqual([SlackService]);
  });
});
