import { listPetTypesDb } from "@/db/Pets/listPetTypesDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { petTypes } from "../petTypes.js";

vi.mock("@/db/Pets/listPetTypesDb.js", () => ({
  listPetTypesDb: vi.fn(),
}));

describe("Query Resolver / petTypes", () => {
  test("calls the database layer successfully", async () => {
    (listPetTypesDb as Mock).mockResolvedValue([{ id: "dog-id", name: "Dog" }]);

    const response = await petTypes();

    expect(listPetTypesDb).toHaveBeenCalledWith();
    expect(response).toEqual([
      {
        id: "dog-id",
        name: "Dog",
      },
    ]);
  });
});
