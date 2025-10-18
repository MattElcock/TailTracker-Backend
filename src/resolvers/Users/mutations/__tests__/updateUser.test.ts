import { describe, expect, Mock, test, vi } from "vitest";
import { updateUserDb } from "@/db/Users/updateUserDb.js";
import { updateUser } from "../updateUser.js";
import mockCtx from "@/__mocks__/mockCtx.js";

vi.mock("@/db/Users/updateUserDb.js", () => ({
  updateUserDb: vi.fn(),
}));

describe("Mutation Resolver / updateUser", () => {
  test("calls the database layer successfully", async () => {
    (updateUserDb as Mock).mockResolvedValue({
      id: "user-id",
      first_name: "Joe",
      last_name: "Bloggs",
      seen_app_purpose_disclaimer: "2025-10-18T09:33:52.180Z",
    });

    const response = await updateUser(
      undefined,
      {
        id: "user-1",
        user: {
          firstName: "Joe",
          lastName: "Bloggs",
          seenAppPurposeDisclaimer: "2025-10-18T09:33:52.180Z",
        },
      },
      mockCtx
    );

    expect(updateUserDb).toHaveBeenCalledWith("user-1", {
      first_name: "Joe",
      last_name: "Bloggs",
      seen_app_purpose_disclaimer: "2025-10-18T09:33:52.180Z",
    });

    expect(response).toEqual({
      firstName: "Joe",
      id: "user-id",
      lastName: "Bloggs",
      seenAppPurposeDisclaimer: "2025-10-18T09:33:52.180Z",
    });
  });

  test("throws an error if trying to update a different user", async () => {
    const thisWillThrow = async () => {
      await updateUser(
        undefined,
        {
          id: "user-2",
          user: {
            firstName: "Joe",
            lastName: "Bloggs",
            seenAppPurposeDisclaimer: "2025-10-18T09:33:52.180Z",
          },
        },
        mockCtx
      );
    };

    await expect(thisWillThrow).rejects.toThrowError(
      "User lacks necessary permission"
    );
  });
});
