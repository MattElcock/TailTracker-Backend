import { getEnclosureByIdDb } from "@/db/Enclosures/getEnclosureByIdDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { enclosure } from "../enclosure.js";

vi.mock("@/db/Enclosures/getEnclosureByIdDb.js", () => ({
  getEnclosureByIdDb: vi.fn(),
}));

describe("Field Resolver / enclosure", () => {
  test("calls the database layer successfully", async () => {
    (getEnclosureByIdDb as Mock).mockResolvedValue({
      id: "enclosureA-id",
      enclosure_type_id: "house-id",
      name: "Bono's Palace",
    });

    const response = await enclosure(
      {
        enclosure: "enclosureA-id",
        subtype: "labrador-id",
        id: "bono-id",
        name: "Bono",
      },
      undefined
    );

    expect(getEnclosureByIdDb).toHaveBeenCalledWith("enclosureA-id");
    expect(response).toEqual({
      id: "enclosureA-id",
      name: "Bono's Palace",
      type: "house-id",
    });
  });
});
