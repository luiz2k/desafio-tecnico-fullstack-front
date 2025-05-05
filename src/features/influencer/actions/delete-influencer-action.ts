"use server";

import { revalidatePath } from "next/cache";
import { influencer } from "../services/influencer";

export async function deleteInfluencerAction(id: string) {
  const response = await influencer.delete(id);

  if (response.error) {
    return response;
  }

  revalidatePath("/influencer");
}
