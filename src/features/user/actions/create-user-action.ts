"use server";

import { revalidatePath } from "next/cache";
import { user } from "../services/user";
import { CreateUserDto } from "../validations/create-user-validation";

export async function createUserAction(data: CreateUserDto) {
  const response = await user.create(data);

  if (response.error) {
    return response;
  }

  revalidatePath("/user");
}
