const petTypes = `
  enum PetType {
    cat
    dog
    rodent
  }

  enum PetSubtype {
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

  type Pet {
    id: ID
    name: String
    type: PetType
    subtype: PetSubtype
    enclosure: Enclosure
  }


  input CreatePetInput {
    enclosureId: ID!
    subtype_id: ID!
    name: String!
  }

  type Query {
    pets: [Pet]
  }

  type Mutation {
    createPet(pet: CreatePetInput!): Pet
  }

`;

export { petTypes };
