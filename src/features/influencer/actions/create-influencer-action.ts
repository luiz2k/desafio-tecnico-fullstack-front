"use server";

import { revalidatePath } from "next/cache";
import { influencer } from "../services/influencer";
import { CreateInfluencerDto } from "../validations/create-influencer-validation";

export async function createInfluencerAction(data: CreateInfluencerDto) {
  const response = await influencer.create(data);

  if (response.error) {
    return response;
  }

  revalidatePath("/influencer");
}
