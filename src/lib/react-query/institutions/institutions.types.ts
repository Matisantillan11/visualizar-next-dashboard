import { BaseEntity } from "@/types/base-entity";

export type CreateInstitutionInput = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type DeleteInstitutionInput = {
  id: string;
};

export type UpdateInstitutionInput = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type Institution = BaseEntity & {
  address: string;
  name: string;
  phone: string;
  email: string;
};
