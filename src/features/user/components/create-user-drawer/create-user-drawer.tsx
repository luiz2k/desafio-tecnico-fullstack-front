"use client";

import {
  Button,
  Drawer,
  IconButton,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useCreateUserDrawer } from "./hooks/use-create-user-drawer";

export default function CreateUserDrawer() {
  const {
    description,
    drawerIsOpen,
    onSubmit,
    form,
    handleRoleSelection,
    setDrawerIsOpen,
    renderError,
  } = useCreateUserDrawer();

  return (
    <Drawer open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
      <Drawer.Trigger
        as={Button}
        size="sm"
        onClick={() => setDrawerIsOpen(true)}
      >
        Criar Usuário
      </Drawer.Trigger>
      <Drawer.Overlay>
        <Drawer.Panel placement="left" className="overflow-y-auto">
          <Drawer.DismissTrigger
            as={IconButton}
            size="sm"
            variant="ghost"
            color="secondary"
            className="absolute right-1.5 top-1.5"
            isCircular
          >
            <X className="size-5" />
          </Drawer.DismissTrigger>

          <div>
            <Typography type="h5">Criando Usuário</Typography>

            <Typography
              type="small"
              color={description.color}
              className="mb-6 mt-4"
            >
              {description.message}
            </Typography>
          </div>

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

              {renderError("email")}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Senha"
                {...form.register("password")}
              />

              {renderError("password")}
            </div>

            <div>
              <Select onValueChange={handleRoleSelection}>
                <Select.Trigger placeholder="Papel do usuário" />
                <Select.List>
                  <Select.Option value="editor">Editor</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select.List>
              </Select>

              {renderError("roles")}
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
