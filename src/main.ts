import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./modules/app/app.module";
import { ResolverLoggingInterceptor } from "@api-core/modules/common/interceptors/resolverLogging.interceptor";
import { ConfigService } from "@api-core/modules/config/config.service";
import { LoggerService } from "@api-core/modules/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("E-links API")
    .setDescription("The E-links API description")
    .setVersion("1.0")
    .addTag("elinks")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  const loggerService = app.get(LoggerService);
  app.useGlobalInterceptors(
    new ResolverLoggingInterceptor(app.get(ConfigService), loggerService)
  );
  await app.listen(9999);
  // eslint-disable-next-line no-restricted-syntax
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
