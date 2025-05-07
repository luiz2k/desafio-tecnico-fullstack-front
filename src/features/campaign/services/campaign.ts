import { http } from "@/lib/http-client";
import { CreateCampaignParticipantDto } from "../validations/create-campaign-validation";
import { Campaign } from "../types/campaign-type";

export type Filter = {
  title: string;
  status: string;
};

export const campaign = {
  async create(data: CreateCampaignParticipantDto) {
    return await http<Campaign>("/campaign", {
      method: "POST",
      body: data,
      headerAuthorization: true,
    });
  },

  async findAll(filter?: Filter) {
    const query = new URLSearchParams();

    if (filter) {
      query.set("title", filter.title);
      query.set("status", filter.status);
    }

    return await http<Campaign[]>(`/campaign?${query.toString()}`, {
      method: "GET",
      headerAuthorization: true,
    });
  },

  async update() {},

  async delete(id: string) {
    return await http(`/campaign/${id}`, {
      method: "DELETE",
      headerAuthorization: true,
    });
  },
};
