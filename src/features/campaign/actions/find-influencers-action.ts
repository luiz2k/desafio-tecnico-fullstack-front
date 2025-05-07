"use server";

import {
  influencer,
  InfluencerFilter,
} from "@/features/influencer/services/influencer";

export async function findInfluencersAction(filter?: InfluencerFilter) {
  return await influencer.findAll(filter);
}
