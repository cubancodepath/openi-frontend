// src/api/client.ts

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    const url = new URL(this.baseUrl + endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Remove the default Content-Type header for FormData
    if (options.body instanceof FormData) {
      delete fetchOptions.headers?.["Content-Type"];
    }

    const response = await fetch(url.toString(), {
      ...fetchOptions,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || `API Error: ${response.statusText}`);
    }

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text() as T;
  }

  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    const fetchOptions: FetchOptions = {
      ...options,
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    };

    // Only set Content-Type for JSON data
    if (!(data instanceof FormData)) {
      fetchOptions.headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };
    }

    return this.fetch<T>(endpoint, fetchOptions);
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
