import qs from "qs";

import { APIRoutes } from "../constants/routes";
import { RouteWithParams, Routing } from "./routing";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequestOptions = {
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
};

export class RequestError extends Error {
  public status: number;

  constructor(
    public response: Response,
    public errors: Record<string, unknown>
  ) {
    super(response.statusText);
    this.name = "RequestError";
    this.status = response.status;
    this.response = response;
    this.errors = errors;

    const message =
      ("message" in errors && (errors.message as string)) ||
      "Something went wrong 😢";
    this.message = message;
  }
}

export class Fetcher {
  private static async request<T extends APIRoutes>(
    endpoint: RouteWithParams<T>,
    method: RequestMethod,
    options: RequestOptions = {}
  ) {
    const url = `${Routing.getInterpolatedRoute(endpoint)}?${qs.stringify(
      options?.query
    )}`;

    const requestBody = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.body),
    };

    const response = await fetch(url, {
      method,
      credentials: "include",
      ...(options.body && requestBody),
    });

    const data = await response.json().catch(() => ({}));

    if (response.status >= 400) throw new RequestError(response, data);

    return {
      json: data as unknown,
      ok: response.ok,
      code: response.status,
    };
  }

  public static async get<T extends APIRoutes>(
    endpoint: RouteWithParams<T>,
    options?: RequestOptions
  ) {
    return this.request<T>(endpoint, "GET", options);
  }

  public static async post<T extends APIRoutes>(
    endpoint: RouteWithParams<T>,
    options?: RequestOptions
  ) {
    return this.request(endpoint, "POST", options);
  }

  public static async put<T extends APIRoutes>(
    endpoint: RouteWithParams<T>,
    options?: RequestOptions
  ) {
    return this.request(endpoint, "PUT", options);
  }

  public static async patch<T extends APIRoutes>(
    endpoint: RouteWithParams<T>,
    options?: RequestOptions
  ) {
    return this.request(endpoint, "PATCH", options);
  }

  public static async delete<T extends APIRoutes>(
    endpoint: RouteWithParams<T>,
    options?: RequestOptions
  ) {
    return this.request(endpoint, "DELETE", options);
  }
}
