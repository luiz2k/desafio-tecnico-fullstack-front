"use client";

import { createContext, useCallback, useState } from "react";
import { findParticipantsByCampaignIdAction } from "../../actions/find-participants-by-campaign-id-action";
import { Campaign } from "../../types/campaign-type";
import { Participant } from "../../types/participant-type";
import { findCampaignsAction } from "../../actions/find-campaigns-action";
import { Filter } from "../../services/campaign";

export type CampainsInfluencersContextType = {
  campaigns: Campaign[];
  adminRole: boolean;

  influencers: Participant[];
  campaignSelected: string;
  handleCampaignSelection: (id?: string) => Promise<void>;
  listParticipants: (id: string) => Promise<void>;
  updateCampaigns: (filter?: Filter) => Promise<void>;
};

export const CampainsInfluencersContext = createContext(
  {} as CampainsInfluencersContextType,
);

export const CampainsInfluencersContextProvider = ({
  children,
  campaigns: initialCampaigns,
  adminRole,
}: {
  children: React.ReactNode;
  campaigns: Campaign[] | undefined;
  adminRole: boolean;
}) => {
  const [campaignSelected, setCampaignSelected] = useState<string>("");
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

  const handleCampaignSelection = async (id?: string) => {
    if (id) {
      await listParticipants(id);

      setCampaignSelected(id);

      return;
    }

    setCampaignSelected("");
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
        adminRole,
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
