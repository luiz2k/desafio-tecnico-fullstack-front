"use client";

import { Form } from "@/components/form/form";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Lock, Mail } from "lucide-react";
import { useSignIn } from "./hooks/use-sign-in";

export function SignIn() {
  const { subtitle, form, handleSubmit } = useSignIn();

  return (
    <div className="flex h-screen items-center justify-center p-3.5">
      <Form.Wrapper onSubmit={form.handleSubmit(handleSubmit)}>
        <Form.Header>
          <Form.Title>Login</Form.Title>

          <Form.Subtitle className={subtitle.color}>
            {subtitle.message}
          </Form.Subtitle>
        </Form.Header>

        <Form.Body>
          <div>
            <Input placeholder="E-mail" {...form.register("email")}>
              <Input.Icon>
                <Mail className="h-full w-full" />
              </Input.Icon>
            </Input>

            {form.formState.errors.email?.message && (
              <Typography type="small" color="error">
                {form.formState.errors.email?.message}
              </Typography>
            )}
          </div>

          <div>
            <Input placeholder="Senha" {...form.register("password")}>
              <Input.Icon>
                <Lock className="h-full w-full" />
              </Input.Icon>
            </Input>

            {form.formState.errors.password?.message && (
              <Typography type="small" color="error">
                {form.formState.errors.password?.message}
              </Typography>
            )}
          </div>
        </Form.Body>

        <Form.Footer>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Logar
          </Button>
        </Form.Footer>
      </Form.Wrapper>
    </div>
  );
}
