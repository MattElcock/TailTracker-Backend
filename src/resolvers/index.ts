import UsersResolvers from "./Users";
import EnclosuresResolvers from "./Enclosures";

const resolvers = {
  Query: { ...UsersResolvers.Query, ...EnclosuresResolvers.Query },
  Mutation: { ...UsersResolvers.Mutation, ...EnclosuresResolvers.Mutation },
};

export { resolvers };
