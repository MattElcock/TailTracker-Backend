import { PetType, PetSubtype } from "@/db/Pets/types.js";
import { Enclosure } from "./Enclosures.js";

export interface Pet {
  id: string;
  type: PetType;
  subtype: PetSubtype;
  name: string;
  enclosure: Enclosure;
}
