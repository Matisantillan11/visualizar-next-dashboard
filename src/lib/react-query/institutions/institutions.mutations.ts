import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import {
  CreateInstitutionInput,
  DeleteInstitutionInput,
  Institution,
  UpdateInstitutionInput,
} from "./institutions.types";

export const useCreateInstitution = () => {
  return createMutation<Institution, CreateInstitutionInput>({
    url: "/institutions",
    method: "POST",
    invalidateKeys: [queryKeys.institutions.lists()],
  })();
};

export const useUpdateInstitution = () => {
  return createMutation<Institution, UpdateInstitutionInput>({
    url: (variables) => `/institutions/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.institutions.lists()],
  })();
};

export const useDeleteInstitution = () => {
  return createMutation<Institution, DeleteInstitutionInput>({
    url: (variables) => `/institutions/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.institutions.lists()],
  })();
};
