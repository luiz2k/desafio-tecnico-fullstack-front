"use server";

import { revalidatePath } from "next/cache";
import { user } from "../services/user";
import { CreateUserDto } from "../validations/create-user-validation";

export async function createUserAction(data: CreateUserDto) {
  await user.create(data);

  revalidatePath("/user");
}
