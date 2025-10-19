import { getAuth } from "firebase-admin/auth";
import { GraphQLError } from "graphql";
import { createRequest } from "node-mocks-http";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";
import { authenticate } from "../authentication.js";
import { isCreateUserRequest } from "../isCreateUserRequest.js";
import { getUserDb } from "@/db/Users/getUserDb.js";

vi.mock("firebase-admin/auth", () => ({ getAuth: vi.fn() }));
vi.mock("../isCreateUserRequest.js", () => ({ isCreateUserRequest: vi.fn() }));
vi.mock("@/db/Users/getUserDb.js", () => ({ getUserDb: vi.fn() }));

const mockUnauthenticatedError = new GraphQLError("User is not authenticated", {
  extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
});

describe("authentication", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // spy on console.error and replace with a mock implementation
    errorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

    (isCreateUserRequest as Mock).mockReturnValue(false);
    (getUserDb as Mock).mockResolvedValue({
      id: "user-1",
      first_name: "Joe",
      last_name: "Bloggs",
      seen_app_purpose_disclaimer: "123",
    });
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
    (getAuth as Mock).mockReturnValue({
      verifyIdToken: vi.fn().mockRejectedValue(mockErrorResponse),
    });

    const mockRequest = createRequest({
      headers: { authorization: "Bearer 123" },
    });

    await expect(authenticate(mockRequest)).rejects.toThrow(
      mockUnauthenticatedError
    );
    expect(errorSpy).toHaveBeenCalledWith(mockErrorResponse);
  });

  test("throws if user not found in database and not a createUser request", async () => {
    (getAuth as Mock).mockReturnValue({
      verifyIdToken: vi.fn().mockResolvedValue({}),
    });
    (getUserDb as Mock).mockResolvedValue(null);
    (isCreateUserRequest as Mock).mockReturnValue(false);

    const mockRequest = createRequest({
      headers: { authorization: "Bearer 123" },
    });

    await expect(authenticate(mockRequest)).rejects.toThrow(
      mockUnauthenticatedError
    );

    expect(errorSpy).toHaveBeenCalledWith("User not found in database");
  });

  test("returns a blank user for createUser requests when user not found in database", async () => {
    (getAuth as Mock).mockReturnValue({
      verifyIdToken: vi.fn().mockResolvedValue({}),
    });
    (getUserDb as Mock).mockResolvedValue(null);
    (isCreateUserRequest as Mock).mockReturnValue(true);

    const mockRequest = createRequest({
      headers: { authorization: "Bearer 123" },
    });
    const user = await authenticate(mockRequest);

    expect(user).toEqual({
      id: "",
      first_name: "",
      last_name: "",
      seen_app_purpose_disclaimer: "",
    });
  });

  test("returns the authenticated user", async () => {
    (getAuth as Mock).mockReturnValue({
      verifyIdToken: vi.fn().mockResolvedValue({}),
    });

    const mockRequest = createRequest({
      headers: { authorization: "Bearer 123" },
    });
    const user = await authenticate(mockRequest);

    expect(user).toEqual({
      first_name: "Joe",
      id: "user-1",
      last_name: "Bloggs",
      seen_app_purpose_disclaimer: "123",
    });
  });
});
