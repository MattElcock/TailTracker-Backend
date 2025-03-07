import { PetSubtype, PetType } from "db/Pets/types";

export interface Pet {
  id: string;
  type: PetType;
  subtype: PetSubtype;
  name: string;
}
