import { getPetSubtypeByIdDb } from "@/db/Pets/getPetSubtypeByIdDb.js";
import { getPetTypeByIdDb } from "@/db/Pets/getPetTypeByIdDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { type } from "../type.js";

vi.mock("@/db/Pets/getPetSubtypeByIdDb.js", () => ({
  getPetSubtypeByIdDb: vi.fn(),
}));
vi.mock("@/db/Pets/getPetTypeByIdDb.js", () => ({
  getPetTypeByIdDb: vi.fn(),
}));

describe("Field Resolver / type", () => {
  test("calls the database layer successfully", async () => {
    (getPetSubtypeByIdDb as Mock).mockResolvedValue({
      id: "labrador-id",
      type_id: "dog-id",
      name: "Labrador",
    });
    (getPetTypeByIdDb as Mock).mockResolvedValue({
      id: "dog-id",
      name: "Dog",
    });

    const response = await type({
      enclosure: "house-id",
      subtype: "labrador-id",
      id: "bono-id",
      name: "Bono",
    });

    expect(getPetSubtypeByIdDb).toHaveBeenCalledWith("labrador-id");
    expect(getPetTypeByIdDb).toHaveBeenCalledWith("dog-id");
    expect(response).toEqual({
      id: "dog-id",
      name: "Dog",
    });
  });
});
