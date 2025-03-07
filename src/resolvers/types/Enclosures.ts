import { EnclosureTypeName } from "db/Enclosures/types";

export interface Enclosure {
  id: String;
  type: EnclosureTypeName;
  name: String;
}
