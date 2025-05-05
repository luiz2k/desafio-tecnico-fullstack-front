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

export function TableOptions({ id, influencer }: TableOptionsProps) {
  const [deleteInfluencer, setDeleteInfluencer] = useState(false);
  const [updateInfluencer, setUpdateInfluencer] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Trigger as={IconButton} size="xs">
          <EllipsisVertical className="size-4" />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={() => setUpdateInfluencer(true)}>
            Atualizar
          </Menu.Item>
          <Menu.Item onClick={() => setDeleteInfluencer(true)}>
            Deletar
          </Menu.Item>
        </Menu.Content>
      </Menu>

      <DeleteInfluencerDialog
        id={id}
        deleteInfluencer={deleteInfluencer}
        setDeleteInfluencer={setDeleteInfluencer}
      />

      <UpdateInfluencerDialog
        id={id}
        influencer={influencer}
        updateInfluencer={updateInfluencer}
        setUpdateInfluencer={setUpdateInfluencer}
      />
    </>
  );
}
