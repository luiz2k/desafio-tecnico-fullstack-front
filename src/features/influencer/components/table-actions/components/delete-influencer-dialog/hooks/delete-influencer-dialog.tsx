import { deleteInfluencerAction } from "@/features/influencer/actions/delete-influencer-action";
import { TypographyProps } from "@material-tailwind/react";
import { useState } from "react";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

export type UseDeleteInfluencerDialog = {
  id: string;
};

export function useDeleteInfluencerDialog({ id }: UseDeleteInfluencerDialog) {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Após a exclusão, os dados do influenciador serão perdidos permanentemente. Deseja prosseguir?",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const response = await deleteInfluencerAction(id);

      if (response?.error) {
        throw new Error(response.message);
      }
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

  return { description, handleDelete, isLoading };
}
