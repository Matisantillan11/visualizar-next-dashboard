import { FilterSelect } from "./filter-select";
import { FuzzyText } from "./fuzzy-text";

export const UserFilters = ({
  fuzzyText,
  handleFuzzy,
  selectedRole,
  onSelectRole,
}: {
  fuzzyText: string;
  handleFuzzy: (str: string) => void;
  selectedRole?: string;
  onSelectRole: (role?: string) => void;
}) => {
  return (
    <div className="flex w-full items-center justify-between gap-30">
      <FuzzyText value={fuzzyText} onChange={handleFuzzy} />
      <FilterSelect selectedRole={selectedRole} onSelectRole={onSelectRole} />
    </div>
  );
};
