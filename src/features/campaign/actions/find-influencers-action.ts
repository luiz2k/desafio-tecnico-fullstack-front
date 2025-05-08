"use server";

import { influencer } from "@/features/influencer/services/influencer";
import { InfluencerFilter } from "../../influencer/services/influencer-filter-type";

export async function findInfluencersAction(filter?: InfluencerFilter) {
  return await influencer.findAll(filter);
}
