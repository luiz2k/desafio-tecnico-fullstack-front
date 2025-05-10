"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Faz o logout do usuário.
 *
 * Esta função remove o token de acesso dos cookies e redireciona
 * o usuário para a página de login.
 */
export async function signOut() {
  const access_token = cookies().get("access_token")?.value;

  if (!access_token) return;

  cookies().delete("access_token");
  redirect("/sign-in");
}
