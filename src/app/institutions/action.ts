import { fetcher } from "@/lib/fetcher";
import { Institution } from "@/types/institutions";

export default async function getInstitutions() {
  return await fetcher<Institution[]>({ url: "/institutions" });
}
