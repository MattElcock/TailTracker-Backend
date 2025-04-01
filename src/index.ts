import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUserDb } from "db/Users/getUserDb";
import dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";
import authenticate from "utils/authentication";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";
import { Context } from "types";
import { IncomingMessage } from "http";

dotenv.config(); // Load environment variables
initializeApp(); // Initialise Firebase

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }: { req: IncomingMessage }) => {
    const firebaseUserId = await authenticate(req);
    const user = await getUserDb(firebaseUserId!);

    return { user };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
