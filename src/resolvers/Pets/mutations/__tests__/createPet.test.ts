import { createPetDb } from "@/db/Pets/createPetDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { createPet } from "../createPet.js";

vi.mock("@/db/Pets/createPetDb.js", () => ({
  createPetDb: vi.fn(),
}));

describe("Mutation Resolver / createPet", () => {
  test("calls the database layer successfully", async () => {
    (createPetDb as Mock).mockResolvedValue({
      id: "pet-id",
      subtype_id: "labrador-id",
      name: "Bono",
      enclosure_id: "house-id",
    });

    const response = await createPet(undefined, {
      pet: {
        enclosureId: "house-id",
        subtype_id: "labrador-id",
        name: "Bono",
      },
    });

    expect(createPetDb).toHaveBeenCalledWith({
      enclosure_id: "house-id",
      subtype_id: "labrador-id",
      name: "Bono",
    });
    expect(response).toEqual({
      enclosure: "house-id",
      id: "pet-id",
      name: "Bono",
      subtype: "labrador-id",
    });
  });
});
