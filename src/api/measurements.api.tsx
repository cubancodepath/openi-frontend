export async function fetchDateRangeData(
  start?: Date,
  end?: Date,
  parameter?: string | null
) {
  if (!start || !end) return [];
  const startParam = start.toISOString().split("T")[0];
  const endParam = end.toISOString().split("T")[0];
  let url = `http://localhost:4000/api/measurements/date-range?start=${startParam}&end=${endParam}`;
  if (parameter) {
    url += `&parameter=${parameter}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error fetching date range data");
  }
  return res.json();
}
