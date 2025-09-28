import { getPetSubtypeByIdDb } from "@/db/Pets/getPetSubtypeByIdDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { subtype } from "../subtype.js";

vi.mock("@/db/Pets/getPetSubtypeByIdDb.js", () => ({
  getPetSubtypeByIdDb: vi.fn(),
}));

describe("Field Resolver / subtype", () => {
  test("calls the database layer successfully", async () => {
    (getPetSubtypeByIdDb as Mock).mockResolvedValue({
      id: "labrador-id",
      name: "Labrador",
    });

    const response = await subtype({
      enclosure: "house-id",
      subtype: "labrador-id",
      id: "bono-id",
      name: "Bono",
    });

    expect(getPetSubtypeByIdDb).toHaveBeenCalledWith("labrador-id");
    expect(response).toEqual({
      id: "labrador-id",
      name: "Labrador",
    });
  });
});
