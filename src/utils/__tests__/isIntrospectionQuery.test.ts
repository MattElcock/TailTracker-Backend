import { describe, expect, test } from "vitest";
import { isIntrospectionQuery } from "../isIntrospectionQuery.js";
import { IncomingMessageWithBody } from "@/types.js";

describe("isIntrospectionQuery", () => {
  test("returns true if the query is an introspection query", () => {
    const result = isIntrospectionQuery({
      body: { operationName: "IntrospectionQuery" },
    } as IncomingMessageWithBody);
    expect(result).toBe(true);
  });

  test("returns truefalse if the query is not an introspection query", () => {
    const result = isIntrospectionQuery({
      body: { operationName: "Foo" },
    } as IncomingMessageWithBody);
    expect(result).toBe(false);
  });
});
