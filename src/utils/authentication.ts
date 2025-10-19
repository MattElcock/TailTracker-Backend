import { getAuth } from "firebase-admin/auth";
import { throwUnauthenticated } from "./throwUnauthenticated.js";
import { getUserDb } from "@/db/Users/getUserDb.js";
import { IncomingMessageWithBody } from "@/types.js";
import { isCreateUserRequest } from "./isCreateUserRequest.js";

const authenticate = async (req: IncomingMessageWithBody) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      console.error("Request is missing auth header");
      throwUnauthenticated();
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    const user = await getUserDb(decodedToken.uid);

    /*
     * Allow createUser requests to pass through even if the user is not found
     * in the database, as this means a new user signing up for the first time.
     *
     * This is the only case where this is OK.
     */
    if (!user && isCreateUserRequest(req)) {
      return {
        id: "",
        first_name: "",
        last_name: "",
        seen_app_purpose_disclaimer: "",
      };
    }

    if (!user) {
      console.error("User not found in database");
      throwUnauthenticated();
    }

    return user;
  } catch (error) {
    console.error(error);
    throwUnauthenticated();
  }
};

export default authenticate;
