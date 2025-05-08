import { updateInfluencerAction } from "@/features/influencer/actions/update-influencer-action";
import { Influencer } from "@/features/influencer/types/influencer-type";
import {
  UpdateInfluencerDto,
  updateInfluencerSchema,
} from "@/features/influencer/validations/update-influencer-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, TypographyProps } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

const initialDescription: Description = {
  color: "default",
  message:
    "Após a atualização, os dados anteriores do influenciador serão perdidos permanentemente. Deseja prosseguir?",
};

type UseUpdateInfluencerDialogProps = {
  id: string;
  influencer: Omit<Influencer, "_id" | "__v">;
  setIsUpdateInfluencerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useUpdateInfluencerDialog({
  id,
  influencer,
  setIsUpdateInfluencerOpen,
}: UseUpdateInfluencerDialogProps) {
  const [description, setDescription] =
    useState<Description>(initialDescription);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<UpdateInfluencerDto>({
    resolver: zodResolver(updateInfluencerSchema),
    defaultValues: {
      name: influencer.name,
      social_network: influencer.social_network,
      followers: influencer.followers,
    },
  });

  const handleUpdate = async (data: UpdateInfluencerDto) => {
    try {
      setIsLoading(true);

      const response = await updateInfluencerAction(id, data);

      if (response?.error) {
        throw new Error(response.message);
      }

      setIsUpdateInfluencerOpen(false);

      form.reset({
        name: data.name,
        social_network: data.social_network,
        followers: data.followers,
      });

      setDescription(initialDescription);

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });

        setIsLoading(false);
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

  return { form, description, handleUpdate, renderError, isLoading };
}
