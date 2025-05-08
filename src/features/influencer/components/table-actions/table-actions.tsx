"use client";

import { IconButton, Menu } from "@material-tailwind/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Influencer } from "../../types/influencer-type";
import { DeleteInfluencerDialog } from "./components/delete-influencer-dialog/delete-influencer-dialog";
import { UpdateInfluencerDialog } from "./components/update-influencer-dialog/update-influencer-dialog";

type TableOptionsProps = {
  id: string;
  influencer: Omit<Influencer, "_id" | "__v">;
};

export function TableActions({ id, influencer }: TableOptionsProps) {
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
          <Menu.Item onClick={() => setIsDeleteDialogOpen(true)}>
            Deletar
          </Menu.Item>
        </Menu.Content>
      </Menu>

      <DeleteInfluencerDialog
        id={id}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      <UpdateInfluencerDialog
        id={id}
        influencer={influencer}
        isUpdateInfluencerOpen={isUpdateInfluencerOpen}
        setIsUpdateInfluencerOpen={setIsUpdateInfluencerOpen}
      />
    </>
  );
}
