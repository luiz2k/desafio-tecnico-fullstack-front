"use server";

import { revalidatePath } from "next/cache";
import { user } from "../services/user";

export async function deleteUserAction(id: string) {
  const response = await user.delete(id);

  console.log(response);

  if (response.error) {
    return response;
  }

  revalidatePath("/user");
}
