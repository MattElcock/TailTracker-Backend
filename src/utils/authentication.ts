import { getAuth } from "firebase-admin/auth";
import { GraphQLError } from "graphql";
import { IncomingMessage } from "http";

const throwUnauthenticated = () => {
  throw new GraphQLError("User is not authenticated", {
    extensions: {
      code: "UNAUTHENTICATED",
      http: { status: 401 },
    },
  });
};

const authenticate = async (req: IncomingMessage): Promise<string> => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throwUnauthenticated();
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    throwUnauthenticated();
  }
};

export default authenticate;
