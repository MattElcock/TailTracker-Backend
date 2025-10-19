import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";
import { authenticate } from "@/utils/authentication.js";
import { resolvers } from "@/resolvers/index.js";
import typeDefs from "@/typeDefs.js";
import { Context, IncomingMessageWithBody } from "@/types.js";

dotenv.config(); // Load environment variables
initializeApp(); // Initialise Firebase

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const typedReq = req as IncomingMessageWithBody; // TODO - Swap to a typeguard

    // Allow introspection queries in non-production environments without authentication
    if (
      typedReq.body.operationName === "IntrospectionQuery" &&
      process.env.NODE_ENV !== "production"
    ) {
      return {
        user: {
          id: "",
          first_name: "",
          last_name: "",
          seen_app_purpose_disclaimer: "",
        },
      };
    }

    const user = await authenticate(typedReq);

    return { user };
  },
  listen: { port: 4000 },
});

console.info(`🚀  Server ready at: ${url}`);
