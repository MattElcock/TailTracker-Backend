import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUser } from "db/Users/getUser";
import dotenv from "dotenv";
import { initializeApp } from "firebase-admin/app";
import authenticate from "utils/authentication";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";

dotenv.config(); // Load environment variables
initializeApp(); // Initialise Firebase

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    const userUid = await authenticate(req);
    const user = await getUser(userUid);

    return { user };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
