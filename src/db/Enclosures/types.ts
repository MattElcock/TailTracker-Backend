export enum EnclosureTypeName {
  FreeRoam = "free_roam",
  Cage = "cage",
}

export interface EnclosureTypeTable {
  id: string;
  name: EnclosureTypeName;
}

export interface EnclosureTable {
  id: string;
  owner_id: string;
  name: string;
  enclosure_type_id: string;
  created_at: string;
  updated_at: string;
}
