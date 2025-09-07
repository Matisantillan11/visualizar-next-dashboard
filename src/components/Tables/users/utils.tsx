import { Role } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
export default function getRoleBadge(role: Role): ReactNode {
  const badge = {
    [Role.ADMIN]: (
      <Badge variant="destructive">
        <p className="inherit text-pretty lowercase">{role}</p>
      </Badge>
    ),
    [Role.STUDENT]: (
      <Badge variant="default">
        <p className="inherit text-pretty lowercase">{role}</p>
      </Badge>
    ),
    [Role.TEACHER]: (
      <Badge variant="default">
        <p className="inherit text-pretty lowercase">{role}</p>
      </Badge>
    ),
    [Role.INSTITUTION]: (
      <Badge variant="outline">
        <p className="inherit text-pretty lowercase">{role}</p>
      </Badge>
    ),
  };

  return badge[role];
}
