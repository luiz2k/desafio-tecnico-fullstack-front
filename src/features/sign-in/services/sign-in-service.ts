import { http } from "@/lib/http-client";
import { SignInDto } from "../validations/sign-in-validation";

type SignIn = {
  access_token: string;
};

export const auth = {
  signIn: async (data: SignInDto) => {
    return await http<SignIn>("/auth/sign-in", {
      method: "POST",
      body: data,
    });
  },
};
