import { apiClient } from "./client";

export async function fetchDateRangeData(
  start?: Date,
  end?: Date,
  parameter?: string
) {
  if (!start || !end) return [];
  const startParam = start.toISOString().split("T")[0];
  const endParam = end.toISOString().split("T")[0];

  return apiClient.get("/measurements/date-range", {
    params: {
      start: startParam,
      end: endParam,
      ...(parameter && { parameter }),
    },
  });
}

export const uploadFile = async (
  file: File
): Promise<{ ingestionId: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post("/measurements/upload", formData);
};
