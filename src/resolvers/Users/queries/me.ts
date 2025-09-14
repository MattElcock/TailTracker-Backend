import { User } from "@/resolvers/types/Users.js";
import { Context } from "@/types.js";

const me = async (
  _parent: void,
  _args: void,
  { user }: Context
): Promise<User> => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    seenAppPurposeDisclaimer: user.seen_app_purpose_disclaimer,
  };
};

export { me };
