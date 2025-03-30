import { listPetTypesDb } from "db/Pets/listPetTypesDb";

interface ResolverReturn {
  id: string;
  name: string;
}

const petTypes = async (): Promise<ResolverReturn[]> => {
  const petTypes = await listPetTypesDb();

  return petTypes.map((type) => ({ id: type.id, name: type.name }));
};

export { petTypes };
