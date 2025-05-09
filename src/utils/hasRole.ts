import { UserRole } from "@/features/user/enums/user-role-enum";
import { auth } from "./auth";

// Verifica se o usuário tem um dos roles permitidos
export async function hasRole(allowedRoles: Array<UserRole>): Promise<boolean> {
  const userRoles = await auth();

  if (!userRoles) return false;

  return allowedRoles.includes(userRoles?.roles[0]);
}
