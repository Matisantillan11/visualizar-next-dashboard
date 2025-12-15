import { Role } from "@/lib/react-query/users/users.types";

export interface AuthUser {
  id: string;
  teacherId?: string;
  studentId?: string;
  role: Role;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  accessToken: string;
  expiresAt: number;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    teacherId?: string;
    studentId?: string;
    email: string;
    name: string | null;
    role: Role;
  };
}

export type AuthError = {
  attemts: number;
  message: string;
  retryAt: string | null;
};
