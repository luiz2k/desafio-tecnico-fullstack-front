"use server";

import { revalidatePath } from "next/cache";
import { user } from "../services/user";

export async function deleteUserAction(id: string) {
  const response = await user.delete(id);

  if (response.error) {
    return response;
  }

  revalidatePath("/user");
}
