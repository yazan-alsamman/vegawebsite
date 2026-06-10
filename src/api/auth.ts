import { apiFetch } from "./client";

export interface AdminUser {
  id: string;
  username: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export async function login(username: string, password: string) {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getMe() {
  return apiFetch<{ user: AdminUser }>("/api/auth/me", {}, true);
}
