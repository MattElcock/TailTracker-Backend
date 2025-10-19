import { describe, Mock, test, vi, beforeEach, expect } from "vitest";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authenticate } from "@/utils/authentication.js";
import { afterEach } from "node:test";

vi.mock("@apollo/server/standalone", () => ({
  startStandaloneServer: vi.fn(),
}));
vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
}));
vi.mock("@/utils/authentication.js", () => ({
  authenticate: vi.fn(),
}));
vi.mock("@/resolvers/index.js", () => ({
  resolvers: {},
}));

describe("server index", () => {
  const startingNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (startStandaloneServer as Mock).mockResolvedValue({
      url: "http://example:4000",
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = startingNodeEnv;
  });

  test("server starts and listens on the correct port", async () => {
    await import("@/index.js");

    expect(startStandaloneServer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ listen: { port: 4000 } })
    );
  });

  test("calls authenticate for non-introspection queries", async () => {
    await import("@/index.js");

    const callArgs = (startStandaloneServer as Mock).mock.calls[0];
    const options = callArgs[1];
    const contextFunc = options.context;

    const fakeReq = {
      body: {
        operationName: "SomeOtherQuery",
      },
    };

    await contextFunc({ req: fakeReq });

    expect(authenticate).toHaveBeenCalledWith(fakeReq);
  });

  test("doesn't authenticate introspection queries in non-prod environments", async () => {
    process.env.NODE_ENV = "development";
    await import("@/index.js");

    const callArgs = (startStandaloneServer as Mock).mock.calls[0];
    const options = callArgs[1];
    const contextFunc = options.context;

    const fakeReq = {
      body: {
        operationName: "IntrospectionQuery",
      },
    };

    await contextFunc({ req: fakeReq });

    expect(authenticate).not.toHaveBeenCalled();
  });
});
