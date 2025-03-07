import UsersResolvers from "./Users";
import EnclosuresResolvers from "./Enclosures";
import PetResolvers from "./Pets";
import merge from "lodash/merge";

const resolvers = merge({}, UsersResolvers, EnclosuresResolvers, PetResolvers);

export { resolvers };
