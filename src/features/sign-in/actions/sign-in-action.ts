"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../services/sign-in-service";
import { SignInDto } from "../validations/sign-in-validation";

export async function signInAction(data: SignInDto) {
  const response = await auth.signIn(data);

  cookies().set("access_token", response.data.access_token);

  redirect("/user");
}
