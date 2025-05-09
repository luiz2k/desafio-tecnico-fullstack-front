"use client";

import { Influencer } from "@/features/influencer/types/influencer-type";
import { IconButton, Menu } from "@material-tailwind/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { DeleteInfluencerFromCampaignDialog } from "./components/delete-influencer-from-campaign-dialog/delete-influencer-from-campaign-dialog";

type TableOptionsProps = {
  campaignId: string;
  influencerId: string;
  influencer: Omit<Influencer, "_id" | "__v">;
};
export function TableOptions({ campaignId, influencerId }: TableOptionsProps) {
  const [
    isDeleteInfluencerFromCampaignDialogOpen,
    setIsDeleteInfluencerFromCampaignDialogOpen,
  ] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Trigger as={IconButton} size="xs">
          <EllipsisVertical className="size-4" />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item
            onClick={() => setIsDeleteInfluencerFromCampaignDialogOpen(true)}
          >
            Deletar
          </Menu.Item>
        </Menu.Content>
      </Menu>

      {isDeleteInfluencerFromCampaignDialogOpen && (
        <DeleteInfluencerFromCampaignDialog
          campaignId={campaignId}
          influencerId={influencerId}
          isDeleteInfluencerFromCampaignDialogOpen={
            isDeleteInfluencerFromCampaignDialogOpen
          }
          setIsDeleteInfluencerFromCampaignDialogOpen={
            setIsDeleteInfluencerFromCampaignDialogOpen
          }
        />
      )}
    </>
  );
}
