import { mergeTypeDefs } from "@graphql-tools/merge";
import { enclosureTypes } from "@/resolvers/Enclosures/gqlTypes.js";
import { petTypes } from "@/resolvers/Pets/gqlTypes.js";
import { userTypes } from "@/resolvers/Users/gqlTypes.js";

const types = [userTypes, enclosureTypes, petTypes];

const schema = mergeTypeDefs(types);

export default schema;
