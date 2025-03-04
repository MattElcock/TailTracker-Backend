import { client } from "knexClient";
import { DBUser } from "./types";

const getUserDb = async (
  firebaseUserId: string
): Promise<Omit<DBUser, "firebase_id">> => {
  const response = await client
    .select(["id", "first_name", "last_name", "seen_app_purpose_disclaimer"])
    .from("users")
    .where({ firebase_id: firebaseUserId });

  const user = response[0];

  return user;
};

export { getUserDb };
