const petTypes = `
  enum PetTypeName {
    cat
    dog
    rodent
  }

  type PetType {
    id: ID
    name: PetTypeName
  }

  enum PetSubtypeName {
    abyssinian
    american_bobtail
    american_curl
    akita
    alaskan_malamute
    australian_shepherd
    chinchilla
    degu
    fancy_mouse
    fancy_rat
  }

  type PetSubtype {
    id: ID
    name: PetSubtypeName
  }

  type Pet {
    id: ID
    name: String
    type: PetTypeName
    subtype: PetSubtypeName
    enclosure: Enclosure
  }


  input CreatePetInput {
    enclosureId: ID!
    subtypeId: ID!
    name: String!
  }

  type Query {
    pets: [Pet]
    petTypes: [PetType]
    petSubtypes(petTypeId: ID!): [PetSubtype]
  }

  type Mutation {
    createPet(pet: CreatePetInput!): Pet
  }

`;

export { petTypes };
