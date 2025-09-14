import UsersResolvers from "@/resolvers/Users/index.js";
import EnclosuresResolvers from "@/resolvers/Enclosures/index.js";
import PetResolvers from "@/resolvers/Pets/index.js";
import merge from "lodash/merge.js";

const resolvers = merge({}, UsersResolvers, EnclosuresResolvers, PetResolvers);

export { resolvers };
