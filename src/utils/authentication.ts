import { getAuth } from "firebase-admin/auth";
import { IncomingMessage } from "http";
import { throwUnauthenticated } from "./throwUnauthenticated.js";

const authenticate = async (
  req: IncomingMessage
): Promise<string | undefined> => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    console.error("Request is missing auth header");
    throwUnauthenticated();
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error(error);
    throwUnauthenticated();
  }
};

export default authenticate;
