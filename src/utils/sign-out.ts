"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Deslogar o usuário autenticado
export async function signOut() {
  const access_token = cookies().get("access_token")?.value;

  if (!access_token) return;

  cookies().delete("access_token");
  redirect("/sign-in");
}
