import { client } from "knexClient";
import { DBUser } from "./types";

const createUser = async (
  user: Omit<DBUser, "id">
): Promise<Omit<DBUser, "firebase_id">> => {
  const resp = await client.transaction(function (trx) {
    return trx
      .insert({
        firebase_id: user.firebase_id,
        first_name: user.first_name,
        last_name: user.last_name,
        seen_app_purpose_disclaimer: user.seen_app_purpose_disclaimer,
      })
      .into("users")
      .returning([
        "id",
        "first_name",
        "last_name",
        "seen_app_purpose_disclaimer",
      ]);
  });

  const returnUser = resp[0];

  return returnUser;
};

export { createUser };
