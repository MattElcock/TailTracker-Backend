import { describe, expect, Mock, test, vi } from "vitest";
import { enclosures } from "../enclosures.js";
import mockCtx from "@/__mocks__/mockCtx.js";
import { listEnclosuresDb } from "@/db/Enclosures/listEnclosuresDb.js";

vi.mock("@/db/Enclosures/listEnclosuresDb.js", () => ({
  listEnclosuresDb: vi.fn(),
}));

describe("createEnclosure", () => {
  test("calls the database layer successfully", async () => {
    (listEnclosuresDb as Mock).mockResolvedValue([
      {
        id: "enclosureA-id",
        enclosure_type_id: "cage-id",
        name: "Ratto Mansion",
      },
      {
        id: "enclosureB-id",
        enclosure_type_id: "house-id",
        name: "Doggo Palace",
      },
    ]);

    const response = await enclosures(undefined, undefined, mockCtx);

    expect(response).toEqual([
      {
        id: "enclosureA-id",
        name: "Ratto Mansion",
        type: "cage-id",
      },
      {
        id: "enclosureB-id",
        name: "Doggo Palace",
        type: "house-id",
      },
    ]);
  });
});
