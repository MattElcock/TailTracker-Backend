const userTypes = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    seenAppPurposeDisclaimer: String
  }

  input UserInput {
    firebaseId: String!
    firstName: String!
    lastName: String!
    seenAppPurposeDisclaimer: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(user: UserInput!): User
  }
`;

export { userTypes };
