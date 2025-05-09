import { http } from "@/lib/http-client";
import { Participant } from "../types/participant-type";

export const participant = {
  async createMany(campaignId: string, participants: string[]) {
    return await http<Participant[]>(`/participant/bulk/${campaignId}`, {
      method: "POST",
      body: participants,
      headerAuthorization: true,
    });
  },

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
