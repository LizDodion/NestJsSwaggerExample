import { Controller, Get, UseGuards } from "@nestjs/common";
import { RestrictedByAdminToken } from "@api-core/modules/admin/guards/restrictedByAdminToken.guard";
import { HealthcheckService } from "../services/healthcheck.service";
import { HealthcheckMessageResponse } from "../dto";

@Controller()
export class HealthcheckController {
  constructor(private healthcheckService: HealthcheckService) {}

  @Get("/healthcheck/restricted")
  @UseGuards(RestrictedByAdminToken)
  restricted(): Promise<HealthcheckMessageResponse> {
    return this.healthcheckService.healthcheckPingDatabase();
  }
}
