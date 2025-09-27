import { describe, test, expect } from "vitest";
import { throwPermissionError } from "../throwPermissionError.js";
import { GraphQLError } from "graphql";

describe("throwPermissionError", () => {
  test("throws an error using the given message", async () => {
    expect(() => throwPermissionError()).toThrow(
      new GraphQLError("User lacks necessary permission", {
        extensions: {
          code: "FORBIDDEN",
          http: { status: 403 },
        },
      })
    );
  });
});
