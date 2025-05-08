import { http } from "@/lib/http-client";
import { UserRole } from "@/features/user/enums/user-role-enum";
import { CreateUserDto } from "../validations/create-user-validation";

type User = {
  _id: string;
  email: string;
  roles: UserRole[];
  __v: number;
};

export const user = {
  async create(data: CreateUserDto) {
    return await http<User>("/user", {
      method: "POST",
      body: data,
      headerAuthorization: true,
    });
  },

  async findAll() {
    return await http<User[]>("/user", {
      method: "GET",
      headerAuthorization: true,
    });
  },

  async delete(id: string) {
    return await http<User[]>(`/user/${id}`, {
      method: "DELETE",
      headerAuthorization: true,
    });
  },
};
