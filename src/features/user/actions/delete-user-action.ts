"use server";

import { revalidatePath } from "next/cache";
import { user } from "../services/user";

export async function deleteUserAction(id: string) {
  await user.delete(id);

  revalidatePath("/user");
}
