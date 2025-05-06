import { http } from "@/lib/http-client";
import { Participant } from "../types/participant-type";

export const participant = {
  async findByCampaignId(id: string) {
    return await http<Participant[]>(`/participant/${id}`, {
      method: "GET",
      headerAuthorization: true,
    });
  },

  async delete(campaignId: string, influencerId: string) {
    return await http(`/participant/${campaignId}/${influencerId}`, {
      method: "DELETE",
      headerAuthorization: true,
    });
  },
};
