import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends Omit<RequestInit, "body"> {
  method?: HttpMethod;
  body?: Record<string, unknown>;
  headerAuthorization?: boolean;
}

type SuccessResponse<R> = {
  message: string;
  data: R;
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
  const baseUrl = process.env.API_URL;

  const response = await fetch(`${baseUrl}${url}`, {
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

    throw new Error(data.message);
  }

  return await response.json();
}
