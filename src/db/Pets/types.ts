export enum PetType {
  Cat = "cat",
  Dog = "dog",
  Rodent = "rodent",
}

export enum PetSubtype {
  Abyssinian = "abyssinian",
  AmericanBobtail = "american_bobtail",
  AmericanCurl = "american_curl",
  Akita = "akita",
  AlaskanMalamute = "alaskan_malamute",
  AustralianShepherd = "australian_shepherd",
  Chinchilla = "chinchilla",
  Degu = "degu",
  FancyMouse = "fancy_mouse",
  FancyRat = "fancy_rat",
}

export interface PetTypesTable {
  id: string;
  name: PetType;
}

export interface PetSubtypeTable {
  id: string;
  type_id: string;
  name: PetSubtype;
}

export interface PetsTable {
  id: string;
  enclosure_id: string;
  subtype_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
