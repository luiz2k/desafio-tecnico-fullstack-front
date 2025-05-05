"use server";

import { revalidatePath } from "next/cache";
import { influencer } from "../services/influencer";
import { UpdateInfluencerDto } from "../validations/update-influencer-validation";

export async function updateInfluencerAction(
  id: string,
  data: UpdateInfluencerDto,
) {
  const response = await influencer.update(id, data);

  if (response.error) {
    return response;
  }

  revalidatePath("/influencer");
}
