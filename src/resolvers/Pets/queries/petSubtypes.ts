import { listPetSubtypes } from "@/db/Pets/listPetSubtypesDb.js";

interface ResolverReturn {
  id: string;
  name: string;
}

interface Args {
  petTypeId: string;
}

const petSubtypes = async (
  _parent: void,
  args: Args
): Promise<ResolverReturn[]> => {
  const petSubtypes = await listPetSubtypes(args.petTypeId);

  return petSubtypes.map((type) => ({
    id: type.id,
    name: type.name,
  }));
};

export { petSubtypes };
