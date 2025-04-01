import { EnclosureTypeName } from "db/Enclosures/types";

export interface Enclosure {
  id: string;
  type: EnclosureTypeName;
  name: string;
}
