"use client";

import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { dateFormatter } from "@/utils/formatters";
import { Card, Typography } from "@material-tailwind/react";
import { User } from "lucide-react";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { CampainFilter } from "./components/campain-filter/campain-filter";

export function CampaignList() {
  const { campaigns, campaignSelected, handleCampaignSelection } = useContext(
    CampainsInfluencersContext,
  );

  return (
    <div className="space-y-4">
      <CampainFilter />

      <>
        {campaigns && campaigns?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:block sm:space-y-4">
            {campaigns?.map((campaign) => (
              <Card
                key={campaign._id}
                onClick={() => handleCampaignSelection(campaign)}
                className={twMerge(
                  "cursor-pointer p-2.5",
                  campaignSelected?._id === campaign._id &&
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
                      Início:{" "}
                      {dateFormatter.format(new Date(campaign.startedAt))}
                    </p>
                    <p>
                      Fim: {dateFormatter.format(new Date(campaign.finishedAt))}
                    </p>
                    <p>Status: {campaign.status}</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center">Nenhuma campanha encontrada</p>
        )}
      </>
    </div>
  );
}
