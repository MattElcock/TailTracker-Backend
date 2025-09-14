import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUserDb } from "@/db/Users/getUserDb.js";
import dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";
import authenticate from "@/utils/authentication.js";
import { resolvers } from "@/resolvers/index.js";
import typeDefs from "@/typeDefs.js";
import { Context } from "@/types.js";
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

console.info(`🚀  Server ready at: ${url}`);
