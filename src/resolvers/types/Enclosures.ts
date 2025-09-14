import { EnclosureTypeName } from "@/db/Enclosures/types.js";

export interface Enclosure {
  id: string;
  type: EnclosureTypeName;
  name: string;
}
