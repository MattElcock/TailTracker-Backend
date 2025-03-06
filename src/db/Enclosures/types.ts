enum EnclosureType {
  FreeRoam = "free_roam",
  Cage = "cage",
}

export interface EnclosureWithTypeDbJoin {
  id: string;
  owner_id: string;
  name: string;
  type: EnclosureType;
  created_at: string;
  updated_at: string;
}
