import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { CreateInstitutionInput, Institution } from "./institutions.types";

export const useCreateInstitution = () => {
  return createMutation<Institution, CreateInstitutionInput>({
    url: "/institutions",
    method: "POST",
    invalidateKeys: [queryKeys.institutions.lists()],
  })();
};
