import mockCtx from "@/__mocks__/mockCtx.js";
import { listPetsDb } from "@/db/Pets/listPetsDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { pets } from "../pets.js";

vi.mock("@/db/Pets/listPetsDb.js", () => ({
  listPetsDb: vi.fn(),
}));

describe("Field Resolver / pets", () => {
  test("calls the database layer successfully", async () => {
    (listPetsDb as Mock).mockResolvedValue([
      {
        id: "bono-id",
        name: "Bono",
        subtype_id: "lab-id",
        enclosure_id: "house-id",
      },
      {
        id: "blue-id",
        name: "Blue",
        subtype_id: "springerspaniel-id",
        enclosure_id: "house-id",
      },
    ]);

    const response = await pets(
      {
        id: "house-id",
        type: "house",
        name: "Doggo Palace",
      },
      undefined,
      mockCtx
    );

    expect(listPetsDb).toHaveBeenCalledWith({
      enclosures: { ownerId: "def" },
      pets: { enclosureId: "house-id" },
    });
    expect(response).toEqual([
      {
        enclosure: "house-id",
        id: "bono-id",
        name: "Bono",
        subtype: "lab-id",
      },
      {
        enclosure: "house-id",
        id: "blue-id",
        name: "Blue",
        subtype: "springerspaniel-id",
      },
    ]);
  });
});
