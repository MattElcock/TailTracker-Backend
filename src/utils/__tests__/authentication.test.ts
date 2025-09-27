import { getAuth } from "firebase-admin/auth";
import { GraphQLError } from "graphql";
import { createRequest } from "node-mocks-http";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";
import authenticate from "../authentication.js";

vi.mock("firebase-admin/auth", () => ({ getAuth: vi.fn() }));

const mockUnauthenticatedError = new GraphQLError("User is not authenticated", {
  extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
});

describe("authentication", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // spy on console.error and replace with a mock implementation
    errorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
  });

  test("throws when authentication header is missing", async () => {
    const mockRequest = createRequest();

    await expect(authenticate(mockRequest)).rejects.toThrow(
      mockUnauthenticatedError
    );
    expect(errorSpy).toHaveBeenCalledWith("Request is missing auth header");
  });

  test("throws when authentication header is malformed", async () => {
    const mockRequest = createRequest({
      headers: { authorization: "123" },
    });

    await expect(authenticate(mockRequest)).rejects.toThrow(
      mockUnauthenticatedError
    );
    expect(errorSpy).toHaveBeenCalledWith("Request is missing auth header");
  });

  test("throws if validating fails", async () => {
    const mockErrorResponse = { message: "My cool error" };
    const mockValidate = vi.fn().mockRejectedValue(mockErrorResponse);
    (getAuth as Mock).mockReturnValue({ verifyIdToken: mockValidate });

    const mockRequest = createRequest({
      headers: { authorization: "Bearer 123" },
    });

    await expect(authenticate(mockRequest)).rejects.toThrow(
      mockUnauthenticatedError
    );
    expect(errorSpy).toHaveBeenCalledWith(mockErrorResponse);
  });

  test("validates the provided token", async () => {
    const mockValidate = vi.fn().mockResolvedValue({});
    (getAuth as Mock).mockReturnValue({ verifyIdToken: mockValidate });

    const mockRequest = createRequest({
      headers: { authorization: "Bearer 123" },
    });

    await authenticate(mockRequest);

    expect(mockValidate).toHaveBeenCalledWith("123");
  });
});
