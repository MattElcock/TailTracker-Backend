import { GraphQLError } from "graphql";
import { describe, expect, it } from "vitest";
import { throwUnauthenticated } from "../throwUnauthenticated.js";

describe("throwPermissionError", () => {
  it("throws an error using the given message", async () => {
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
