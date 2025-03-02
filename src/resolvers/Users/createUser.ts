import { client } from "knexClient";
import { User } from "./types";

interface Args {
  user: {
    firebaseId: string;
    firstName: string;
    lastName: string;
    seenAppPurposeDisclaimer: string;
  };
}

const createUser = async (_, { user }: Args): Promise<User> => {
  const resp = await client.transaction(function (trx) {
    return trx
      .insert({
        firebase_id: user.firebaseId,
        first_name: user.firstName,
        last_name: user.lastName,
        seen_app_purpose_disclaimer: user.seenAppPurposeDisclaimer,
      })
      .into("users")
      .returning([
        "id",
        "first_name",
        "last_name",
        "seen_app_purpose_disclaimer",
      ]);
  });

  const data = resp[0];

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    seenAppPurposeDisclaimer: new Date(
      data.seen_app_purpose_disclaimer
    ).toISOString(),
  };
};

export { createUser };
