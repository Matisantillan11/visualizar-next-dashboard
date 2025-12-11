import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";
import { Institution } from "./institutions.types";

export const useInstitutions = () => {
  return createQuery<Array<Institution>>({
    url: "/institutions",
    queryKey: queryKeys.institutions.lists(),
  })();
};
