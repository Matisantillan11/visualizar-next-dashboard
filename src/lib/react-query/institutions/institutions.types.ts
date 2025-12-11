import { BaseEntity } from "@/types/base-entity";

export type CreateInstitutionInput = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type Institution = BaseEntity & {
  name: string;
  address: string;
  phone: string;
  email: string;
};
