const enclosureTypes = `
  enum EnclosureType {
    free_roam
    cage
  }

  type Enclosure {
    id: ID!
    type: EnclosureType!
    name: String!
  }

  input CreateEnclosureInput {
    name: String!
    type: EnclosureType!
  }

  type Query {
    enclosures: [Enclosure]
  }

  type Mutation {
    createEnclosure(enclosure: CreateEnclosureInput!): Enclosure
  }

`;

export { enclosureTypes };
