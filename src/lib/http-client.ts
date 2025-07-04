import { env } from "@/validations/env-validation";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends Omit<RequestInit, "body"> {
  method?: HttpMethod;
  body?: Record<string, unknown> | unknown[];
  headerAuthorization?: boolean;
}

type SuccessResponse<R> = {
  message: string;
  error?: string;
  data?: R;
};

type ErrorResponse = {
  message: string;
  error: string;
  status: number;
};

/**
 * Função para fazer requisições HTTP para a API.
 *
 * Essa função é um wrapper para padronizar as requisições HTTP.
 */
export async function http<R>(
  url: string,
  init: RequestOptions,
): Promise<SuccessResponse<R>> {
  const response = await fetch(`${env.API_URL}${url}`, {
    ...init,
    body: init.body ? JSON.stringify(init.body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      ...(init.headerAuthorization && {
        Authorization: `Bearer ${cookies().get("access_token")?.value}`,
      }),
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as ErrorResponse;

    return {
      message: data.message,
      error: data.error,
    };
  }

  return await response.json();
}
