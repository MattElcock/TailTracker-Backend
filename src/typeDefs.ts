import { enclosureTypes } from "resolvers/Enclosures/gqlTypes";
import { userTypes } from "./resolvers/Users/gqlTypes";

import { mergeTypeDefs } from "@graphql-tools/merge";

const types = [userTypes, enclosureTypes];

const schema = mergeTypeDefs(types);

export default schema;
