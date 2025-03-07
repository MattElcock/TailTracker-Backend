import { User } from "resolvers/types/Users";
import { Context } from "types";

const me = async (_parent, _args, { user }: Context): Promise<User> => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    seenAppPurposeDisclaimer: user.seen_app_purpose_disclaimer,
  };
};

export { me };
