import { userTypes } from "./resolvers/Users/gqlTypes";
import { mergeTypeDefs } from "@graphql-tools/merge";

const types = [userTypes];

const schema = mergeTypeDefs(types);

export default schema;
