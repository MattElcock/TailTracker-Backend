const enclosureTypes = `
  enum EnclosureType {
    free_roam
    cage
  }

  type Enclosure {
    id: ID!
    type: EnclosureType!
    name: String!
    pets: [Pet]
  }

  input CreateEnclosureInput {
    name: String!
    enclosure_type_id: ID!
  }

  type Query {
    enclosures: [Enclosure]
  }

  type Mutation {
    createEnclosure(enclosure: CreateEnclosureInput!): Enclosure
  }

`;

export { enclosureTypes };
