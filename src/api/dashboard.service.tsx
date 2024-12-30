/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./axios";
export async function fetchDateRangeData(
  start?: Date,
  end?: Date,
  parameter?: string | null
): Promise<any> {
  if (!start || !end) return [];
  const startParam = start.toISOString().split("T")[0];
  const endParam = end.toISOString().split("T")[0];

  return api.get("/measurements/date-range", {
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

  return api.post("/measurements/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
