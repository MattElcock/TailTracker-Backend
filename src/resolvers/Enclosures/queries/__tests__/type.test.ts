import { getEnclosureTypeByIdDb } from "@/db/Enclosures/getEnclosureTypeByIdDb.js";
import { describe, expect, Mock, test, vi } from "vitest";
import { type } from "../type.js";

vi.mock("@/db/Enclosures/getEnclosureTypeByIdDb.js", () => ({
  getEnclosureTypeByIdDb: vi.fn(),
}));

describe("Field Resolver / type", () => {
  test("calls the database layer successfully", async () => {
    (getEnclosureTypeByIdDb as Mock).mockResolvedValue({ name: "House" });

    const response = await type({
      id: "enclosure-id",
      type: "house-id",
      name: "Doggo Palace",
    });

    expect(getEnclosureTypeByIdDb).toHaveBeenCalledWith("house-id");
    expect(response).toEqual("House");
  });
});
