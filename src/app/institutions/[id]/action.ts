import { fetcher } from "@/lib/fetcher";
import { Institution } from "@/lib/react-query/institutions/institutions.types";

export async function getInstitutionById(id: string): Promise<Institution> {
  return await fetcher({ url: `/institutions/${id}` });
}
