export interface MeasuresData {
  Date: string;
  Time: string;
  "CO(GT)": string;
  "PT08.S1(CO)": string;
  "NMHC(GT)": string;
  "C6H6(GT)": string;
  "PT08.S2(NMHC)": string;
  "NOx(GT)": string;
  "PT08.S3(NOx)": string;
  "NO2(GT)": string;
  "PT08.S4(NO2)": string;
  "PT08.S5(O3)": string;
  T: string;
  RH: string;
  AH: string;
}

export interface GetDataParams {
  parameter: string; // e.g. co_gt, c6h6_gt, etc.
  start: string; // YYYY-MM-DD or ISO8601
  end: string; // YYYY-MM-DD or ISO8601
  page?: string; // Page number for pagination
  limit?: string; // Limit of items per page
}
