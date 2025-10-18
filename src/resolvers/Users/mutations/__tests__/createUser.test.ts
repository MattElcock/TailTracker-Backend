import { describe, expect, Mock, test, vi } from "vitest";
import { createUser } from "../createUser.js";
import { createUserDb } from "@/db/Users/createUserDb.js";

vi.mock("@/db/Users/createUserDb.js", () => ({
  createUserDb: vi.fn(),
}));

describe("Mutation Resolver / createUser", () => {
  test("calls the database layer successfully", async () => {
    (createUserDb as Mock).mockResolvedValue({
      id: "user-id",
      first_name: "Joe",
      last_name: "Bloggs",
      seen_app_purpose_disclaimer: "2025-10-18T09:33:52.180Z",
    });

    const response = await createUser(undefined, {
      user: {
        firebaseId: "fierbase-id",
        firstName: "Joe",
        lastName: "Bloggs",
        seenAppPurposeDisclaimer: "2025-10-18T09:33:52.180Z",
      },
    });

    expect(createUserDb).toHaveBeenCalledWith({
      firebase_id: "fierbase-id",
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
});
