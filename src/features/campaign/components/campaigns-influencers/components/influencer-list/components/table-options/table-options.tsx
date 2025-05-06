"use client";

import { Influencer } from "@/features/influencer/types/influencer-type";
import { IconButton, Menu } from "@material-tailwind/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DeleteInfluencerFromCampaign } from "./components/delete-influencer-from-campaign/delete-influencer-from-campaign";

type TableOptionsProps = {
  campaignId: string;
  influencerId: string;
  influencer: Omit<Influencer, "_id" | "__v">;
};
export function TableOptions({ campaignId, influencerId }: TableOptionsProps) {
  const [deleteInfluencer, setDeleteInfluencer] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Trigger as={IconButton} size="xs">
          <EllipsisVertical className="size-4" />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={() => setDeleteInfluencer(true)}>
            Deletar
          </Menu.Item>
        </Menu.Content>
      </Menu>

      <DeleteInfluencerFromCampaign
        campaignId={campaignId}
        influencerId={influencerId}
        deleteInfluencer={deleteInfluencer}
        setDeleteInfluencer={setDeleteInfluencer}
      />
    </>
  );
}
