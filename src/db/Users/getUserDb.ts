import { client } from "@/knexClient.js";
import { DBUser } from "./types.js";

const getUserDb = async (
  firebaseUserId: string
): Promise<Omit<DBUser, "firebase_id">> => {
  try {
    const response = await client
      .select(["id", "first_name", "last_name", "seen_app_purpose_disclaimer"])
      .from("users")
      .where({ firebase_id: firebaseUserId });

    const user = response[0];

    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export { getUserDb };
