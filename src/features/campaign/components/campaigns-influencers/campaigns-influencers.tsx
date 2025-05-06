"use client";

import { useContext } from "react";
import { CampainsInfluencersContext } from "../../context/campains-influencers-context/campains-influencers-context";
import { CampaignList } from "./components/campaign-list/campaign-list";
import { InfluencerList } from "./components/influencer-list/influencer-list";

export function CampaignsInfluencers() {
  const { campaigns } = useContext(CampainsInfluencersContext);

  return (
    <>
      {campaigns && campaigns?.length > 0 ? (
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <CampaignList />

          <InfluencerList />
        </div>
      ) : (
        <p className="text-center">Nenhuma campanha foi criada</p>
      )}
    </>
  );
}
