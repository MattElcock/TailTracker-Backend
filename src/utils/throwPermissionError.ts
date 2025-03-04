import { GraphQLError } from "graphql";

const throwPermissionError = () => {
  throw new GraphQLError("User lacks necessary permission", {
    extensions: {
      code: "FORBIDDEN",
      http: { status: 403 },
    },
  });
};

export { throwPermissionError };
