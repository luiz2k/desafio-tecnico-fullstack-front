"use client";

import { UserRole } from "@/enums/user-role-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  IconButton,
  Input,
  Select,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserAction } from "../../actions/create-user-action";
import {
  CreateUserDto,
  createUserSchema,
} from "../../validations/create-user-validation";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

export default function CreateUserDrawer() {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message: "Preencha o formulário abaixo para criar um novo usuário",
  });

  const [createUser, setCreateUser] = useState(false);

  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserSchema),
  });

  const handleSelect = (value: string) => {
    form.setValue("roles", [value as UserRole]);
  };

  const onSubmit = async (data: CreateUserDto) => {
    try {
      await createUserAction(data);

      form.reset();

      setCreateUser(false);

      setDescription({
        color: "default",
        message: "Preencha o formulário abaixo para criar um novo usuário",
      });
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    }
  };

  return (
    <Drawer open={createUser} onOpenChange={setCreateUser}>
      <Drawer.Trigger as={Button} size="sm" onClick={() => setCreateUser(true)}>
        Criar Usuário
      </Drawer.Trigger>
      <Drawer.Overlay>
        <Drawer.Panel placement="left">
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Criando Usuário</Typography>
            <Drawer.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <X className="h-5 w-5" />
            </Drawer.DismissTrigger>
          </div>
          <Typography
            type="small"
            color={description.color}
            className="mb-6 mt-4"
          >
            {description.message}
          </Typography>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <div>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                {...form.register("email")}
              />

              {form.formState.errors.email && (
                <Typography type="small" color="error">
                  {form.formState.errors.email.message}
                </Typography>
              )}
            </div>

            <div>
              <Input placeholder="Senha" {...form.register("password")} />

              {form.formState.errors.password && (
                <Typography type="small" color="error">
                  {form.formState.errors.password.message}
                </Typography>
              )}
            </div>

            <div>
              <Select onValueChange={handleSelect}>
                <Select.Trigger
                  className="w-72"
                  placeholder="Papel do usuário"
                />
                <Select.List>
                  <Select.Option value="editor">Editor</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select.List>
              </Select>

              {form.formState.errors.roles && (
                <Typography type="small" color="error">
                  {form.formState.errors.roles.message}
                </Typography>
              )}
            </div>

            <Button
              isFullWidth
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Criar
            </Button>
          </form>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
}
