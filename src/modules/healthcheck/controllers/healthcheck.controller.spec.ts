import { mock } from "jest-mock-extended";
import { RestrictedByAdminToken } from "@api-core/modules/admin/guards/restrictedByAdminToken.guard";
import { HealthcheckService } from "../services/healthcheck.service";
import { HealthcheckController } from "./healthcheck.controller";

describe("HealthcheckController", () => {
  let controller: HealthcheckController;
  let mockHealthcheckService: HealthcheckService;

  beforeEach(async () => {
    mockHealthcheckService = mock<HealthcheckService>({
      get: jest.fn(),
      healthcheckPingDatabase: jest.fn(),
    });
    controller = new HealthcheckController(mockHealthcheckService);
  });

  it("should be defined", async () => {
    expect(controller).toBeDefined();
  });

  it("should be labelled as a Nestjs controller", async () => {
    expect(HealthcheckController).toBeController();
  });

  describe("restricted method", () => {
    it("should call healthcheckService.healthcheckPingDatabase", async () => {
      await controller.restricted();
      expect(
        mockHealthcheckService.healthcheckPingDatabase
      ).toHaveBeenCalledTimes(1);
    });

    it("should be called by GET request to /healthcheck/restricted", async () => {
      expect(controller.restricted).toHaveMethodAtRoute(
        "GET",
        "/healthcheck/restricted"
      );
    });

    it("should have RestrictedByAdminToken guard", () => {
      expect(controller.restricted).toStrictHaveGuards([
        RestrictedByAdminToken,
      ]);
    });
  });
});
