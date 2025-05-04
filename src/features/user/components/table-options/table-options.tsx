"use client";

import { IconButton, Menu } from "@material-tailwind/react";
import { EllipsisVertical } from "lucide-react";
import { DeleteUserDialog } from "./components/delete-user-dialog/delete-user-dialog";
import { useState } from "react";

type TableOptionsProps = {
  id: string;
};

export function TableOptions({ id }: TableOptionsProps) {
  const [deleteUser, setDeleteUser] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Trigger as={IconButton} size="xs">
          <EllipsisVertical className="size-4" />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={() => setDeleteUser(true)}>Deletar</Menu.Item>
        </Menu.Content>
      </Menu>

      <DeleteUserDialog
        id={id}
        deleteUser={deleteUser}
        setDeleteUser={setDeleteUser}
      />
    </>
  );
}
