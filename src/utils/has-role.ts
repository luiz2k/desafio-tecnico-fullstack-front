import { UserRole } from "@/features/user/enums/user-role-enum";

/**
 * Verifica se o usuário tem algum dos papéis informados.
 *
 * @param userRoles - Os papéis do usuário.
 * @param allowedRoles - Os papéis permitidos.
 * @returns - true se o usuário tiver algum dos papéis permitidos, false caso contrário.
 */
export function hasRole(
  userRoles?: Array<UserRole>,
  allowedRoles?: Array<UserRole>,
): boolean {
  if (!userRoles || !allowedRoles) return false;

  return allowedRoles.some((role) => userRoles.includes(role));
}
