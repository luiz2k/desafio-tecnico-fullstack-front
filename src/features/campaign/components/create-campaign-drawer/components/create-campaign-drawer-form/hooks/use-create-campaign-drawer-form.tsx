import { createCampaignAction } from "@/features/campaign/actions/create-campaign-action";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { CampaignStatus } from "@/features/campaign/enums/campaign-status-enum";
import { InfluencerFilter } from "@/features/influencer/services/influencer-filter-type";
import {
  CreateCampaignParticipantDto,
  createCampaignParticipantSchema,
} from "@/features/campaign/validations/create-campaign-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Description,
  initialDescription,
} from "../../../hooks/use-create-campaign-drawer";

type UseCreateCampaignDrawerFormProps = {
  setDescription: React.Dispatch<React.SetStateAction<Description>>;
  setIsCreateInfluencerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  findInfluencers: (filter?: InfluencerFilter) => Promise<void>;
};

export function useCreateCampaignDrawerForm({
  setDescription,
  setIsCreateInfluencerOpen,
  findInfluencers,
}: UseCreateCampaignDrawerFormProps) {
  const { updateCampaigns } = useContext(CampainsInfluencersContext);

  const [participants, setParticipants] = useState<string[]>([]);

  const [filter, setFilter] = useState<InfluencerFilter>({
    key: "name",
    value: "",
  });

  const form = useForm({
    resolver: zodResolver(createCampaignParticipantSchema),
  });

  const onSubmit = async (data: CreateCampaignParticipantDto) => {
    try {
      const response = await createCampaignAction(data);

      if (response?.error) {
        throw new Error(response.message);
      }

      form.reset();
      setParticipants([]);
      setIsCreateInfluencerOpen(false);
      updateCampaigns();

      setDescription(initialDescription);
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    }
  };

  const handleChangeStatusSelection = (value: string) => {
    form.setValue("campaign.status", value as CampaignStatus);
  };

  const handleInfluencerParticipant = (value: string) => {
    setParticipants((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      form.setValue("participants", updated);

      return updated;
    });
  };

  const renderError = (error?: string) => {
    return error ? (
      <Typography type="small" color="error">
        {error}
      </Typography>
    ) : null;
  };

  useEffect(() => {
    findInfluencers(filter);
  }, [filter, findInfluencers]);

  return {
    form,
    onSubmit,
    handleChangeStatusSelection,
    handleInfluencerParticipant,
    renderError,
    participants,
    filter,
    setFilter,
  };
}
