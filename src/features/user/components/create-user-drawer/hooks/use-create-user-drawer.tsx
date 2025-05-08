import { UserRole } from "@/features/user/enums/user-role-enum";
import { createUserAction } from "@/features/user/actions/create-user-action";
import {
  CreateUserDto,
  createUserSchema,
} from "@/features/user/validations/create-user-validation";
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
  message: "Preencha o formulário abaixo para criar um novo usuário",
};

export function useCreateUserDrawer() {
  const [description, setDescription] =
    useState<Description>(defaultDescription);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
  });

  const handleRoleSelection = (value: string) => {
    form.setValue("roles", [value as UserRole]);
  };

  const onSubmit = async (data: CreateUserDto) => {
    try {
      const response = await createUserAction(data);

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
    onSubmit,
    form,
    handleRoleSelection,
    setDrawerIsOpen,
    renderError,
  };
}
