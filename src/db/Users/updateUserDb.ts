import { client } from "knexClient";
import { DBUser } from "./types";

const updateUserDb = async (
  id: string,
  user: Omit<DBUser, "id" | "firebase_id">
): Promise<Omit<DBUser, "firebase_id">> => {
  const resp = await client.transaction(function (trx) {
    return trx("users")
      .where({ id })
      .update({
        first_name: user.first_name,
        last_name: user.last_name,
        seen_app_purpose_disclaimer: user.seen_app_purpose_disclaimer,
      })
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

export { updateUserDb };
