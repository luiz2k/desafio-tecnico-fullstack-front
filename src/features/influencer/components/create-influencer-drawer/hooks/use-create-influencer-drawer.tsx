import { createInfluencerAction } from "@/features/influencer/actions/create-influencer-action";
import {
  CreateInfluencerDto,
  createInfluencerSchema,
} from "@/features/influencer/validations/create-influencer-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, TypographyProps } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

const defaultDescription: Description = {
  color: "default",
  message: "Preencha o formulário abaixo para criar um novo influenciador",
};

export function useCreateInfluencerDrawer() {
  const [description, setDescription] =
    useState<Description>(defaultDescription);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const form = useForm<CreateInfluencerDto>({
    resolver: zodResolver(createInfluencerSchema),
  });

  const onSubmit = async (data: CreateInfluencerDto) => {
    try {
      const response = await createInfluencerAction(data);

      if (response?.error) {
        throw new Error(response.message);
      }

      form.reset();
      setDrawerIsOpen(false);
      setDescription(defaultDescription);
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
    description,
    drawerIsOpen,
    setDrawerIsOpen,
    form,
    onSubmit,
    renderError,
  };
}
