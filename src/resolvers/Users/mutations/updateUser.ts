import { updateUserDb } from "@/db/Users/updateUserDb.js";
import { User } from "@/resolvers/types/Users.js";
import { Context } from "@/types.js";
import { throwPermissionError } from "@/utils/throwPermissionError.js";

interface Args {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    seenAppPurposeDisclaimer: string;
  };
}

const updateUser = async (
  _: void,
  { id, user }: Args,
  ctx: Context
): Promise<User> => {
  if (ctx.user.id !== id) {
    throwPermissionError();
  }

  const dbUser = await updateUserDb(id, {
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

export { updateUser };
