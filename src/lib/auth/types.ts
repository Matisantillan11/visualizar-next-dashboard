import { Role } from "@/types/user";

export interface AuthUser {
  supabaseUserId: string;
  id: string;
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
    email: string;
    name: string | null;
    role: Role;
  };
}
