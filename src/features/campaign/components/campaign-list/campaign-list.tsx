"use client";

import { dateFormatter } from "@/utils/formatters";
import { Card, Typography } from "@material-tailwind/react";
import { User } from "lucide-react";
import { useState } from "react";
import { Campaign } from "../../types/campaign-type";
import { twMerge } from "tailwind-merge";

type CampaignList = {
  campaigns: Campaign[] | undefined;
};

export function CampaignList({ campaigns }: CampaignList) {
  const [campaignSelected, setCampaignSelected] = useState<string>("");

  return (
    <div className="space-y-2">
      {campaigns && campaigns?.length > 0 ? (
        <>
          {campaigns?.map((campaign) => (
            <Card
              key={campaign._id}
              onClick={() => setCampaignSelected(campaign._id)}
              className={twMerge(
                "cursor-pointer p-2.5",
                campaignSelected === campaign._id &&
                  "cursor-default bg-zinc-100",
              )}
            >
              <Card.Header className="m-0 flex w-full flex-col items-start gap-0.5 pb-4">
                <Typography type="h6">{campaign.title}</Typography>
                <Typography type="small" className="flex items-center gap-1">
                  <User className="size-4" /> {campaign.customer}
                </Typography>
              </Card.Header>

              <Card.Body className="p-0">
                <div>
                  <p>
                    Início: {dateFormatter.format(new Date(campaign.startedAt))}
                  </p>
                  <p>
                    Fim: {dateFormatter.format(new Date(campaign.finishedAt))}
                  </p>
                  <p>Status: {campaign.status}</p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <p className="text-center">Nenhuma campanha encontrada</p>
      )}
    </div>
  );
}
