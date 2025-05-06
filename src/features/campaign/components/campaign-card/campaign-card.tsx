"use client";

import { Card, Typography } from "@material-tailwind/react";
import { Campaign } from "../../types/campaign-type";
import { dateFormatter } from "@/utils/formatters";
import { User } from "lucide-react";

type CampaignCardProps = {
  campaign: Campaign;
};
export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="p-2.5">
      <Card.Header className="mx-0 flex items-center gap-4 pb-4 pt-0">
        <div className="flex w-full flex-col gap-0.5">
          <Typography type="h6">{campaign.title}</Typography>
          <Typography type="small" className="flex items-center gap-1">
            <User className="size-4" /> {campaign.customer}
          </Typography>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        <p>Início: {dateFormatter.format(new Date(campaign.startedAt))}</p>
        <p>Fim: {dateFormatter.format(new Date(campaign.finishedAt))}</p>
        <p>Status: {campaign.status}</p>
      </Card.Body>
    </Card>
  );
}
