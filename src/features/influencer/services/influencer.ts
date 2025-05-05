import { http } from "@/lib/http-client";
import { CreateInfluencerDto } from "../validations/create-influencer-validation";
import { UpdateInfluencerDto } from "../validations/update-influencer-validation";
import { Influencer } from "../types/influencer-type";

export const influencer = {
  async create(data: CreateInfluencerDto) {
    return await http<Influencer>("/influencer", {
      method: "POST",
      body: data,
      headerAuthorization: true,
    });
  },

  async findAll() {
    return await http<Influencer[]>("/influencer", {
      method: "GET",
      headerAuthorization: true,
    });
  },

  async update(id: string, data: UpdateInfluencerDto) {
    return await http(`/influencer/${id}`, {
      method: "PATCH",
      body: data,
      headerAuthorization: true,
    });
  },

  async delete(id: string) {
    return await http(`/influencer/${id}`, {
      method: "DELETE",
      headerAuthorization: true,
    });
  },
};
