import { MockProxy, mock } from "jest-mock-extended";
import { ConfigService } from "@api-core/modules/config/config.service";
import "./utils/controllerDecorator.utils";
import "./utils/resolverDecorator.utils";
import "./utils/guardDecorator.utils";
import "./utils/interceptorDecorator.utils";
import "./utils/sanitiseService.utils";
import "./utils/argValidator.utils";
import "./utils/elinksEventDecorator.utils";
import "./utils/executionContext.utils";

/**
 * this file is loaded by jest before any test
 * add any jest global setup here
 */

/**
 * mock process.env for integration tests
 * or for config.service.spec.ts unit test
 */
process.env = {
  ...process.env,
  DATABASE_URL: "database-url.com",
  TWILIO_ACCOUNT_SID: "twilio-account-sid",
  TWILIO_AUTH_TOKEN: "twilio-auth-token",
  TWILIO_PHONE_NUMBER: "+447777777777",
  JWT_SECRET: "jwt-secret",
  JWT_EXPIRES_IN: "jwt-expires-in",
  AWS_ACCESS_KEY_ID: "aws-access-key-id",
  AWS_SECRET_ACCESS_KEY: "aws-access-key",
  S3_MEDIA_MANAGED_REGION: "s3-media-managed-region",
  S3_MEDIA_MANAGED_PRIVATE_BUCKET: "s3-media-managed-private-bucket",
  S3_MEDIA_MANAGED_PUBLIC_BUCKET: "s3-media-managed-public-bucket",
  S3_MEDIA_MANAGED_STAGING_BUCKET: "s3-media-managed-staging-bucket",
  S3_MEDIA_MANAGED_CF_DISTRIBUTION_ID: "s3-media-managed-cf-distribution-id",
  S3_MEDIA_MANAGED_CF_KEY_PAIR_ID: "s3-media-managed-cf-key-pair-id",
  S3_MEDIA_MANAGED_CF_DISTRIBUTION_DOMAIN:
    "https://s3-media-managed-cf-distribution-domain.com",
  S3_MEDIA_MANAGED_CF_SIGNING_KEY: "s3-media-managed-cf-signing-key",
  S3_MEDIA_BUCKET_IS_ACCELERATED: "false",
  ELINKS_ADMIN_TOKEN: "elinks-admin-tokens-32-characters",
  SLACK_WEBHOOK_URL: "slack-webhook-url.com",
  IS_SMS_DISABLED: "true",
  IS_PRISMA_LOG_ENABLED: "true",
  IS_GRAPHQL_QUERY_LOG_ENABLED: "true",
  AGORA_APP_ID: "agora-app-id",
  AGORA_APP_CERTIFICATE: "agora-app-certificate",
  AGORA_APP_NAME: "agora-app-name",
  AGORA_ORG_NAME: "agora-org-name",
  AGORA_REST_DOMAIN: "agora-rest-domain.com",
  AGORA_WEBSOCKET_DOMAIN: "agora-web-socket-domain.com",
  FIREBASE_FUNCTION_SECRET: "test-secret",
  FIREBASE_USE_EMULATOR: "true",
  FIREBASE_PROJECT_ID: "elinks-app-dev",
  FIREBASE_API_KEY: "a-firebase-api-key",
  ELINKS_ENV: "in-test",
};

jest.mock("@aws-sdk/client-s3", () => {
  return {
    PutObjectCommand: jest.fn(),
  };
});
// add comment
export const mockConfigService: MockProxy<ConfigService> =
  mock<ConfigService>();

// TODO: mock logs so that they don't pollute the console during tests
beforeEach(() => expect.hasAssertions());
