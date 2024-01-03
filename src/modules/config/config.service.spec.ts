import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { getMockConfigService } from './testing/mockConfigService';

const createService = async (envVariables?): Promise<ConfigService> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: ConfigService,
        useValue: getMockConfigService(envVariables ?? {}),
      },
    ],
  }).compile();

  return module.get<ConfigService>(ConfigService);
};

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    service = await createService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve the correct config', async () => {
    expect(service.variable.AGORA_APP_CERTIFICATE).toEqual(
      'agora-app-certificate',
    );
  });

  it('returns booleans for get methods', async () => {
    const isPrismaLogEnabled = service.isPrismaLogEnabled;
    const isGraphqlQueryLogEnabled = service.isGraphqlQueryLogEnabled;
    const isS3MediaBucketAccelerated = service.isS3MediaBucketAccelerated;
    const isSmsDisabled = service.isSmsDisabled;

    expect(typeof isPrismaLogEnabled).toEqual('boolean');
    expect(typeof isGraphqlQueryLogEnabled).toEqual('boolean');
    expect(typeof isS3MediaBucketAccelerated).toEqual('boolean');
    expect(typeof isSmsDisabled).toEqual('boolean');
  });

  it('should error if variable is missing', async () => {
    process.env = {};

    try {
      service = await createService();
    } catch (error: any) {
      expect(error.message).toContain('Configuration validation error');
    }
  });
});
