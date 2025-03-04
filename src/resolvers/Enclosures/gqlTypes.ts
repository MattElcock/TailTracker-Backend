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

  type Query {
    enclosures: [Enclosure]
  }

`;

export { enclosureTypes };
