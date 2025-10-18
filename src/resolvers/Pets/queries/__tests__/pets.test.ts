import mockCtx from "@/__mocks__/mockCtx.js";
import { listPetsDb } from "@/db/Pets/listPetsDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { pets } from "../pets.js";

vi.mock("@/db/Pets/listPetsDb.js", () => ({
  listPetsDb: vi.fn(),
}));

describe("Query Resolver / pets", () => {
  test("calls the database layer successfully", async () => {
    (listPetsDb as Mock).mockResolvedValue([
      {
        id: "bono-id",
        name: "Bono",
        subtype: "labrador-id",
        enclosure: "house-id",
      },
    ]);

    const response = await pets(undefined, undefined, mockCtx);

    expect(listPetsDb).toHaveBeenCalledWith({
      enclosures: { ownerId: "user-1" },
    });
    expect(response).toEqual([
      {
        enclosure: undefined,
        id: "bono-id",
        name: "Bono",
        subtype: undefined,
      },
    ]);
  });
});
