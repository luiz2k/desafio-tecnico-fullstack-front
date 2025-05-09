"use client";

import { createContext, useCallback, useState } from "react";
import { findCampaignsAction } from "../../actions/find-campaigns-action";
import { findParticipantsByCampaignIdAction } from "../../actions/find-participants-by-campaign-id-action";
import { Filter } from "../../services/campaign";
import { Campaign } from "../../types/campaign-type";
import { Participant } from "../../types/participant-type";

export type CampainsInfluencersContextType = {
  campaigns: Campaign[];
  influencers: Participant[];
  campaignSelected: Campaign | null;
  handleCampaignSelection: (campain?: Campaign) => Promise<void>;
  listParticipants: (id: string) => Promise<void>;
  updateCampaigns: (filter?: Filter) => Promise<void>;
};

export const CampainsInfluencersContext = createContext(
  {} as CampainsInfluencersContextType,
);

export const CampainsInfluencersContextProvider = ({
  children,
  campaigns: initialCampaigns,
}: {
  children: React.ReactNode;
  campaigns: Campaign[] | undefined;
}) => {
  const [campaignSelected, setCampaignSelected] = useState<Campaign | null>(
    null,
  );
  const [influencers, setInfluencers] = useState<Participant[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>(
    initialCampaigns || [],
  );

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

  const handleCampaignSelection = async (campain?: Campaign) => {
    if (campain) {
      await listParticipants(campain._id);

      setCampaignSelected(campain);

      return;
    }

    setCampaignSelected(null);
    setInfluencers([]);
  };

  const updateCampaigns = useCallback(async (filter?: Filter) => {
    try {
      const response = await findCampaignsAction(filter);

      if (response?.error) {
        throw new Error(response.message);
      }

      if (response?.data) {
        setCampaigns(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <CampainsInfluencersContext.Provider
      value={{
        campaigns,
        influencers,
        campaignSelected,
        handleCampaignSelection,
        listParticipants,
        updateCampaigns,
      }}
    >
      {children}
    </CampainsInfluencersContext.Provider>
  );
};
