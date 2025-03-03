const userTypes = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    seenAppPurposeDisclaimer: String
  }

  input CreateUserInput {
    firebaseId: String!
    firstName: String!
    lastName: String!
    seenAppPurposeDisclaimer: String
  }

  input UpdateUserInput {
    firstName: String!
    lastName: String!
    seenAppPurposeDisclaimer: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(user: CreateUserInput!): User
    updateUser(id: ID!, user: UpdateUserInput!): User
  }
`;

export { userTypes };
