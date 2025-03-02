import UserResolvers from "./Users";

const resolvers = {
  Query: { ...UserResolvers.Query },
  Mutation: { ...UserResolvers.Mutation },
};

export { resolvers };
