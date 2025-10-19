import { describe, expect, Mock, test, vi } from "vitest";
import { me } from "../me.js";
import mockCtx from "@/__mocks__/mockCtx.js";

describe("Resolver / me", () => {
  test("return the user stored in context", async () => {
    const response = await me(undefined, undefined, mockCtx);

    expect(response).toEqual({
      firstName: "Joe",
      id: "user-1",
      lastName: "Bloggs",
      seenAppPurposeDisclaimer: "123",
    });
  });
});
