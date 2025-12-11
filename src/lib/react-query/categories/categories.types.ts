import { BaseEntity } from "@/types/base-entity";

export type Category = BaseEntity & {
  name: string;
};

export type CreateCategoryInput = {
  name: string;
};
