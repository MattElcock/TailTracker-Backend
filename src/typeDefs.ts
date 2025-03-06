import { mergeTypeDefs } from "@graphql-tools/merge";
import { enclosureTypes } from "resolvers/Enclosures/gqlTypes";
import { petTypes } from "resolvers/Pets/gqlTypes";
import { userTypes } from "./resolvers/Users/gqlTypes";

const types = [userTypes, enclosureTypes, petTypes];

const schema = mergeTypeDefs(types);

export default schema;
