import { describe, expect, test, vi } from "vitest";
import resolvers from "../index.js";

vi.mock("@/db/Enclosures/createEnclosureDb.js", () => ({
  createEnclosureDb: vi.fn(),
}));

vi.mock("@/db/Enclosures/listEnclosuresDb.js", () => ({
  listEnclosuresDb: vi.fn(),
}));

vi.mock("@/db/Pets/listPetsDb.js", () => ({
  listPetsDb: vi.fn(),
}));

vi.mock("@/db/Enclosures/getEnclosureTypeByIdDb.js", () => ({
  getEnclosureTypeByIdDb: vi.fn(),
}));

describe("index", () => {
  test("exposes queries and mutations", () => {
    expect(resolvers).toMatchObject({
      Query: {
        enclosures: expect.any(Function),
      },
      Mutation: {
        createEnclosure: expect.any(Function),
      },
      Enclosure: {
        pets: expect.any(Function),
        type: expect.any(Function),
      },
    });
  });
});
