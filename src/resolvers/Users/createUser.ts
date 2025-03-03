import { User } from "./types";
import { createUser as createDbUser } from "db/Users/createUser";

interface Args {
  user: {
    firebaseId: string;
    firstName: string;
    lastName: string;
    seenAppPurposeDisclaimer: string;
  };
}

const createUser = async (_, { user }: Args): Promise<User> => {
  const dbUser = await createDbUser({
    firebase_id: user.firebaseId,
    first_name: user.firstName,
    last_name: user.lastName,
    seen_app_purpose_disclaimer: user.seenAppPurposeDisclaimer,
  });

  return {
    id: dbUser.id,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    seenAppPurposeDisclaimer: new Date(
      dbUser.seen_app_purpose_disclaimer
    ).toISOString(),
  };
};

export { createUser };
