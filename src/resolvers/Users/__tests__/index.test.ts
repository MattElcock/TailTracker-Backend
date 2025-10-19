import { describe, expect, test, vi } from "vitest";
import resolvers from "../index.js";

vi.mock("@/db/Users/createUserDb.js", () => ({
  createUserDb: vi.fn(),
}));

vi.mock("@/db/Users/updateUserDb.js", () => ({
  updateUserDb: vi.fn(),
}));

describe("index", () => {
  test("exposes queries and mutations", () => {
    expect(resolvers).toMatchObject({
      Query: { me: expect.any(Function) },
      Mutation: {
        createUser: expect.any(Function),
        updateUser: expect.any(Function),
      },
    });
  });
});
