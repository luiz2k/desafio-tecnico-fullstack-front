"use client";

import { IconButton, Menu } from "@material-tailwind/react";
import { EllipsisVertical } from "lucide-react";
import { useContext, useState } from "react";
import { Influencer } from "../../types/influencer-type";
import { DeleteInfluencerDialog } from "./components/delete-influencer-dialog/delete-influencer-dialog";
import { UpdateInfluencerDialog } from "./components/update-influencer-dialog/update-influencer-dialog";
import { RolesContext } from "@/contexts/roles-context/roles-context";
import { hasRole } from "@/utils/has-role";
import { UserRole } from "@/features/user/enums/user-role-enum";

type TableOptionsProps = {
  id: string;
  influencer: Omit<Influencer, "_id" | "__v">;
};

export function TableActions({ id, influencer }: TableOptionsProps) {
  const { roles } = useContext(RolesContext);
  const hasAccess = hasRole(roles, [UserRole.ADMIN]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateInfluencerOpen, setIsUpdateInfluencerOpen] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Trigger as={IconButton} size="xs">
          <EllipsisVertical className="size-4" />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={() => setIsUpdateInfluencerOpen(true)}>
            Atualizar
          </Menu.Item>
          {hasAccess && (
            <Menu.Item onClick={() => setIsDeleteDialogOpen(true)}>
              Deletar
            </Menu.Item>
          )}
        </Menu.Content>
      </Menu>

      {hasAccess && (
        <DeleteInfluencerDialog
          id={id}
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        />
      )}

      <UpdateInfluencerDialog
        id={id}
        influencer={influencer}
        isUpdateInfluencerOpen={isUpdateInfluencerOpen}
        setIsUpdateInfluencerOpen={setIsUpdateInfluencerOpen}
      />
    </>
  );
}
