import { ConfigModule } from "../config/config.module";
import { ElinksAdminModule } from "./elinksAdmin.module";
import { SlackService } from "./services/slackWebhook.service";
import { slackWebookFactory } from "./factories/slackWebhook.factory";

describe("AdminTokenModule", () => {
  it("should import providers and modules", () => {
    const imports = Reflect.getMetadata("imports", ElinksAdminModule);
    const providers = Reflect.getMetadata("providers", ElinksAdminModule);
    const exports = Reflect.getMetadata("exports", ElinksAdminModule);

    expect(imports).toStrictEqual([ConfigModule]);
    expect(providers).toStrictEqual([SlackService, slackWebookFactory]);
    expect(exports).toStrictEqual([SlackService]);
  });
});
