import { client } from "knexClient";
import { User } from "./types";

const listUsers = async (): Promise<User[]> => {
  const response = await client
    .select(["id", "first_name", "last_name", "seen_app_purpose_disclaimer"])
    .from("users");

  return response.map((data) => ({
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    seenAppPurposeDisclaimer: new Date(
      data.seen_app_purpose_disclaimer
    ).toISOString(),
  }));
};

export { listUsers };
