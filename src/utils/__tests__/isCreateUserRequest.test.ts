import { describe, expect, test } from "vitest";
import { isCreateUserRequest } from "../isCreateUserRequest.js";
import { IncomingMessageWithBody } from "@/types.js";

const mockCreateUserMutation = {
  body: {
    query:
      "mutation Mutation($user: CreateUserInput!) {\n  createUser(user: $user) {\n    firstName\n    id\n    lastName\n    seenAppPurposeDisclaimer\n  }\n}",
  },
} as IncomingMessageWithBody;

const mockCreateEnclosureMutation = {
  body: {
    query:
      "mutation CreateEnclosure($enclosure: CreateEnclosureInput!) {\n  createEnclosure(enclosure: $enclosure) {\n    id\n    name\n    pets {\n      id\n    }\n    type\n  }\n}",
  },
} as IncomingMessageWithBody;

const mockMixedMutation = {
  body: {
    query:
      "mutation CreateEnclosure($enclosure: CreateEnclosureInput!, $user: CreateUserInput!) {\n  createEnclosure(enclosure: $enclosure) {\n    id\n    name\n    pets {\n      id\n    }\n    type\n  }\n  createUser(user: $user) {\n    firstName\n    id\n    lastName\n    seenAppPurposeDisclaimer\n  }\n}",
  },
} as IncomingMessageWithBody;

describe("isCreateUserRequest", () => {
  test("returns true for a createUser mutation", () => {
    const result = isCreateUserRequest(mockCreateUserMutation);
    expect(result).toBe(true);
  });

  test("returns false for a non-createUser mutation", () => {
    const result = isCreateUserRequest(mockCreateEnclosureMutation);
    expect(result).toBe(false);
  });

  test("returns false for a mixed mutation", () => {
    const result = isCreateUserRequest(mockMixedMutation);
    expect(result).toBe(false);
  });
});
