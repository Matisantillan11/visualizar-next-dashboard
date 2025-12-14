import { BaseEntity } from "@/types/base-entity";

export type CreateAuthorInput = {
  name: string;
  biography: string;
};

export type UpdateAuthorInput = {
  id: string;
  name: string;
  biography: string;
};

export type Author = BaseEntity & {
  name: string;
  biography: string;
};
