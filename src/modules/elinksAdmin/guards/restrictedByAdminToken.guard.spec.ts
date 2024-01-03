import { mockConfigService } from "@api-core/testing/jest.setup";
import { setupGuard } from "@api-core/testing/utils/setupGuard.utils";
import { UnauthorizedException } from "@nestjs/common";
import { RestrictedByAdminToken } from "./restrictedByAdminToken.guard";

describe("RestrictedByAdminToken", () => {
  const testToken = "test-token";
  mockConfigService.variable.ELINKS_ADMIN_TOKEN = testToken;

  it("returns false when context type is not met", async () => {
    const restrictedByAdminToken = new RestrictedByAdminToken(
      mockConfigService
    );
    const { mockContext } = setupGuard({
      mockHttpRes: {
        getRequest: () => ({
          query: {
            adminToken: testToken,
          },
        }),
      },
    });
    const isAuthorized = await restrictedByAdminToken.canActivate(mockContext);

    expect(isAuthorized).toBe(false);
  });

  it("should throw Token is invalid, when token does not match env variable when in graphql context type", async () => {
    const restrictedByAdminToken = new RestrictedByAdminToken(
      mockConfigService
    );
    const { mockContext } = setupGuard({
      mockHttpRes: {
        getRequest: () => ({
          query: {
            adminToken: mockConfigService.variable.ELINKS_ADMIN_TOKEN,
          },
        }),
      },
      mockArgs: {
        input: { adminToken: "banana" },
      },
      requestType: "graphql",
    });
    try {
      await restrictedByAdminToken.canActivate(mockContext);
    } catch (err) {
      expect(err).toEqual(new UnauthorizedException("Token is invalid"));
    }
  });

  it("should return true, as adminToken query param matches config token when in graphql context type", async () => {
    const restrictedByAdminToken = new RestrictedByAdminToken(
      mockConfigService
    );
    const { mockContext } = setupGuard({
      mockHttpRes: {
        getRequest: () => ({
          query: {
            adminToken: testToken,
          },
        }),
      },
      mockArgs: { input: { adminToken: testToken } },
      requestType: "graphql",
    });
    const isAuthorized = await restrictedByAdminToken.canActivate(mockContext);

    expect(isAuthorized).toBe(true);
  });

  it("should return true, as adminToken query param matches config token when in http context type", async () => {
    const restrictedByAdminToken = new RestrictedByAdminToken(
      mockConfigService
    );

    const { mockContext } = setupGuard({
      mockHttpRes: {
        getRequest: jest.fn().mockImplementation(() => {
          return {
            query: { adminToken: testToken },
          };
        }),
      },
      mockArgs: { input: { adminToken: testToken } },
      requestType: "http",
    });

    const isAuthorized = await restrictedByAdminToken.canActivate(mockContext);

    expect(isAuthorized).toBe(true);
  });

  it("should throw Token is invalid, when token does not match env variable when in http context type", () => {
    const restrictedByAdminToken = new RestrictedByAdminToken(
      mockConfigService
    );

    const { mockContext } = setupGuard({
      mockHttpRes: {
        getRequest: jest.fn().mockImplementation(() => {
          return {
            query: { adminToken: "wrong-token" },
          };
        }),
      },
      mockArgs: { input: { adminToken: testToken } },
      requestType: "http",
    });
    const isAuthorized = restrictedByAdminToken.canActivate(mockContext);

    isAuthorized.catch((e) => {
      expect(e.message).toEqual("Token is invalid");
    });
  });
});
