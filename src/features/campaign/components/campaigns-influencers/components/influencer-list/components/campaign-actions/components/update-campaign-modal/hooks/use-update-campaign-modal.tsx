import { updateCampainAction } from "@/features/campaign/actions/update-campain-action";
import { Description } from "@/features/campaign/components/create-campaign-drawer/hooks/use-create-campaign-drawer";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { CampaignStatus } from "@/features/campaign/enums/campaign-status-enum";
import {
  UpdateCampaignDto,
  updateCampaignSchema,
} from "@/features/campaign/validations/update-campaign-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

// Faz a formatação da data para ser recebida pelo input de data
const dateFormatter = (date?: string) => {
  const dateObj = date ? new Date(date) : new Date();

  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const hh = String(dateObj.getHours()).padStart(2, "0");
  const min = String(dateObj.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

const initialDescription: Description = {
  color: "default",
  message:
    "Após a atualização da campanha, os dados anteriores serão perdidos permanentemente. Deseja prosseguir?",
};

type UseUpdateCampaignModalProps = {
  setIsUpdateCampaignOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function useUpdateCampaignModal({
  setIsUpdateCampaignOpen,
}: UseUpdateCampaignModalProps) {
  const { campaignSelected, updateCampaigns } = useContext(
    CampainsInfluencersContext,
  );

  const [description, setDescription] =
    useState<Description>(initialDescription);

  const form = useForm({
    resolver: zodResolver(updateCampaignSchema),
    defaultValues: {
      ...campaignSelected,
      startedAt: dateFormatter(campaignSelected?.startedAt),
      finishedAt: dateFormatter(campaignSelected?.finishedAt),
    },
  });

  const handleChangeStatusSelection = (value: string) => {
    form.setValue("status", value as CampaignStatus);
  };

  const onSubmit = async (data: UpdateCampaignDto) => {
    try {
      if (campaignSelected) {
        const response = await updateCampainAction(campaignSelected?._id, data);

        if (response.error) {
          throw new Error(response.message);
        }

        updateCampaigns();
        setIsUpdateCampaignOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    }
  };

  const renderError = (field: keyof typeof form.formState.errors) => {
    const error = form.formState.errors[field];
    return error ? (
      <Typography type="small" color="error">
        {error.message}
      </Typography>
    ) : null;
  };

  return {
    form,
    description,
    onSubmit,
    handleChangeStatusSelection,
    campaignSelected,
    renderError,
  };
}
