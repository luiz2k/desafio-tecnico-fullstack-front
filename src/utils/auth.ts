"use server";

import { UserRole } from "@/features/user/enums/user-role-enum";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export type Payload = {
  sub: string;
  email: string;
  roles: Array<UserRole>;
  iat: number;
  exp: number;
};

/**
 * Função para verificar se o usuário está autenticado.
 *
 * Retorna o payload do token de acesso, que contém as informações do usuário.
 *
 * @returns Payload do token de acesso ou undefined se não autenticado.
 */
export async function auth(): Promise<Payload | undefined> {
  const access_token = cookies().get("access_token")?.value;

  if (!access_token) return;

  const decoded = jwtDecode(access_token) as Payload;

  return decoded;
}
