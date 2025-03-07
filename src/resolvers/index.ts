import UsersResolvers from "./Users";
import EnclosuresResolvers from "./Enclosures";
import PetResolvers from "./Pets";

const resolvers = {
  Query: {
    ...UsersResolvers.Query,
    ...EnclosuresResolvers.Query,
    ...PetResolvers.Query,
  },
  Mutation: {
    ...UsersResolvers.Mutation,
    ...EnclosuresResolvers.Mutation,
    ...PetResolvers.Mutation,
  },
};

export { resolvers };
