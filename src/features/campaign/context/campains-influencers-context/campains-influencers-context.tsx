"use client";

import { createContext, useState } from "react";
import { findParticipantsByCampaignIdAction } from "../../actions/find-participants-by-campaign-id-action";
import { Campaign } from "../../types/campaign-type";
import { Participant } from "../../types/participant-type";

export type CampainsInfluencersContextType = {
  campaigns: Campaign[] | undefined;

  influencers: Participant[];
  campaignSelected: string;
  handleCampaignSelection: (id: string) => Promise<void>;
  listParticipants: (id: string) => Promise<void>;
};

export const CampainsInfluencersContext = createContext(
  {} as CampainsInfluencersContextType,
);

export const CampainsInfluencersContextProvider = ({
  children,
  campaigns,
}: {
  children: React.ReactNode;
  campaigns: Campaign[] | undefined;
}) => {
  const [campaignSelected, setCampaignSelected] = useState<string>("");
  const [influencers, setInfluencers] = useState<Participant[]>([]);

  const listParticipants = async (id: string) => {
    try {
      const response = await findParticipantsByCampaignIdAction(id);

      if (response.error) {
        throw new Error(response.message);
      }

      if (response.data) {
        setInfluencers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCampaignSelection = async (id: string) => {
    await listParticipants(id);

    setCampaignSelected(id);
  };

  return (
    <CampainsInfluencersContext.Provider
      value={{
        campaigns,
        influencers,
        campaignSelected,
        handleCampaignSelection,
        listParticipants,
      }}
    >
      {children}
    </CampainsInfluencersContext.Provider>
  );
};
