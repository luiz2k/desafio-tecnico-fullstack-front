import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInAction } from "../actions/sign-in-action";
import { SignInDto, signInSchema } from "../validations/sign-in-validation";

export function useSignIn() {
  const [subtitle, setSubtitle] = useState({
    color: "text-zinc-700",
    message: "Preencha os campos abaixo para se logar",
  });

  const form = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = async (data: SignInDto) => {
    try {
      const response = await signInAction(data);

      if (response.error) {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubtitle({
          color: "text-red-500",
          message: error.message,
        });
      }
    }
  };

  return { subtitle, form, handleSubmit };
}
