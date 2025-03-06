import { EnclosureType } from "db/Enclosures/types";

export interface Enclosure {
  id: String;
  type: EnclosureType;
  name: String;
}
