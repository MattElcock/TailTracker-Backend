import { GraphQLError } from "graphql";
import { describe, expect, test } from "vitest";
import { throwUnauthenticated } from "../throwUnauthenticated.js";

describe("throwPermissionError", () => {
  test("throws an error using the given message", async () => {
    expect(() => throwUnauthenticated()).toThrow(
      new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      })
    );
  });
});
