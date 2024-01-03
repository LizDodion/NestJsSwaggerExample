import { PrismaModule } from "@api-core/modules/prisma/prisma.module";
import { ConfigService } from "@api-core/modules/config/config.service";
import { PyneaAdminModule } from "@api-core/modules/elinksAdmin/pyneaAdmin.module";
import { ResolverLoggingInterceptor } from "../common/interceptors/resolverLogging.interceptor";
import { HealthcheckService } from "./services/healthcheck.service";
import { HealthcheckResolver } from "./resolvers/healthcheck.resolver";
import { HealthcheckController } from "./controllers/healthcheck.controller";
import { HealthcheckModule } from "./healthcheck.module";
import { HealthcheckListener } from "./listeners/healthcheck.listener";

describe("HealthcheckModule", () => {
  it("should import providers and modules", () => {
    const imports = Reflect.getMetadata("imports", HealthcheckModule);
    const controllers = Reflect.getMetadata("controllers", HealthcheckModule);
    const providers = Reflect.getMetadata("providers", HealthcheckModule);

    expect(imports.length).toEqual(2);
    expect(imports).toStrictEqual([PrismaModule, PyneaAdminModule]);

    expect(controllers).toStrictEqual([HealthcheckController]);

    expect(providers).toStrictEqual([
      HealthcheckResolver,
      HealthcheckService,
      ConfigService,
      ResolverLoggingInterceptor,
      HealthcheckListener,
    ]);
  });
});
