import { getPetTypesDb } from "db/Pets/getPetTypesDb";

interface ResolverReturn {
  id: string;
  name: string;
}

const petTypes = async (): Promise<ResolverReturn[]> => {
  const petTypes = await getPetTypesDb();

  return petTypes.map((type) => ({ id: type.id, name: type.name }));
};

export { petTypes };
