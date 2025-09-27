import { describe, test, expect, vi, Mock } from "vitest";
import { createEnclosure } from "../createEnclosure.js";
import { createEnclosureDb } from "@/db/Enclosures/createEnclosureDb.js";
import mockCtx from "@/__mocks__/mockCtx.js";

vi.mock("@/db/Enclosures/createEnclosureDb.js", () => ({
  createEnclosureDb: vi.fn(),
}));

describe("Mutation Resolver / createEnclosure", () => {
  test("calls the database layer successfully", async () => {
    (createEnclosureDb as Mock).mockResolvedValue({
      id: "enclosure-id",
      enclosure_type_id: "cage-id",
      name: "Ratto Mansion",
    });

    const response = await createEnclosure(
      undefined,
      {
        enclosure: {
          name: "Ratto Mansion",
          enclosure_type_id: "cage-id",
        },
      },
      mockCtx
    );

    expect(response).toEqual({
      id: "enclosure-id",
      name: "Ratto Mansion",
      type: "cage-id",
    });
  });
});
