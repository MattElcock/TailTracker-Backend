import { listPetSubtypes } from "@/db/Pets/listPetSubtypesDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { petSubtypes } from "../petSubtypes.js";

vi.mock("@/db/Pets/listPetSubtypesDb.js", () => ({
  listPetSubtypes: vi.fn(),
}));

describe("Query Resolver / petSubtypes", () => {
  test("calls the database layer successfully", async () => {
    (listPetSubtypes as Mock).mockResolvedValue([
      { id: "labdrador-id", name: "Labrador" },
    ]);

    const response = await petSubtypes(undefined, { petTypeId: "dog-id" });

    expect(listPetSubtypes).toHaveBeenCalledWith("dog-id");
    expect(response).toEqual([
      {
        id: "labdrador-id",
        name: "Labrador",
      },
    ]);
  });
});
