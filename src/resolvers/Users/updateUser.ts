import { client } from "knexClient";
import { User } from "./types";

interface Args {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    seenAppPurposeDisclaimer: string;
  };
}

const updateUser = async (_, { id, user }: Args): Promise<User> => {
  const resp = await client.transaction(function (trx) {
    return trx("users")
      .where({ id })
      .update({
        first_name: user.firstName,
        last_name: user.lastName,
        seen_app_purpose_disclaimer: user.seenAppPurposeDisclaimer,
      })
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

export { updateUser };
