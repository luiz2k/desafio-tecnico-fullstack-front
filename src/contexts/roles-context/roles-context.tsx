"use client";

import { UserRole } from "@/features/user/enums/user-role-enum";
import { createContext } from "react";

type RolesContextType = {
  roles?: UserRole[];
};

export const RolesContext = createContext({} as RolesContextType);

export const RolesContextProvider = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: UserRole[] | undefined;
}) => {
  return (
    <RolesContext.Provider value={{ roles }}>{children}</RolesContext.Provider>
  );
};
