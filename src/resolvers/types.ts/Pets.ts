import { PetSubtype, PetType } from "db/Pets/types";
import { Enclosure } from "./Enclosures";

export interface Pet {
  id: string;
  type: PetType;
  subtype: PetSubtype;
  name: string;
  enclosure: Enclosure;
}
