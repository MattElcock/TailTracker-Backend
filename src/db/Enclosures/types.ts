enum EnclosureType {
  FreeRoam = "free_roam",
  Cage = "cage",
}

export interface DbEnclosure {
  id: string;
  ownerId: string;
  name: string;
  type: EnclosureType;
  created_at: string;
  updated_at: string;
}
