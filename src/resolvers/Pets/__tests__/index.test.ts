import { describe, expect, test, vi } from "vitest";
import resolvers from "../index.js";

vi.mock("@/db/Pets/createPetDb.js", () => ({
  createPetDb: vi.fn(),
}));

vi.mock("@/db/Enclosures/getEnclosureByIdDb.js", () => ({
  getEnclosureByIdDb: vi.fn(),
}));

vi.mock("@/db/Pets/listPetsDb.js", () => ({
  listPetsDb: vi.fn(),
}));

vi.mock("@/db/Pets/listPetSubtypesDb.js", () => ({
  listPetSubtypes: vi.fn(),
}));

vi.mock("@/db/Pets/listPetTypesDb.js", () => ({
  listPetTypesDb: vi.fn(),
}));

vi.mock("@/db/Pets/getPetSubtypeByIdDb.js", () => ({
  getPetSubtypeByIdDb: vi.fn(),
}));

vi.mock("@/db/Pets/getPetTypeByIdDb.js", () => ({
  getPetTypeByIdDb: vi.fn(),
}));

describe("index", () => {
  test("exposes queries and mutations", () => {
    expect(resolvers).toMatchObject({
      Query: {
        pets: expect.any(Function),
        petTypes: expect.any(Function),
        petSubtypes: expect.any(Function),
      },
      Mutation: {
        createPet: expect.any(Function),
      },
      Pet: {
        enclosure: expect.any(Function),
        type: expect.any(Function),
        subtype: expect.any(Function),
      },
    });
  });
});
