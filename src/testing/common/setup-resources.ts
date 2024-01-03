import { MathUtils } from "@api-core/modules/common/utils/math.utils";
import { PrismaService } from "@api-core/modules/prisma/prisma.service";
import { ConfigService } from "@api-core/modules/config/config.service";
import { loggerService } from "./dbTestLog";

export const configService = new ConfigService(loggerService);
export const prismaService = new PrismaService(configService, loggerService);

export const mathUtils = new MathUtils();
