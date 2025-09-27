import { GraphQLError } from "graphql";

const throwUnauthenticated = (): never => {
  throw new GraphQLError("User is not authenticated", {
    extensions: {
      code: "UNAUTHENTICATED",
      http: { status: 401 },
    },
  });
};

export { throwUnauthenticated };
