enum EnclosureType {
  FreeRoam = "free_roam",
  Cage = "cage",
}

export interface Enclosure {
  id: String;
  type: EnclosureType;
  name: String;
}
