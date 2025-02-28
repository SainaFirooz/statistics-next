import api from "./api";

interface DateRange {
  from: Date | null;
  to: Date | null;
}
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; status: number };

export const fetchData = async <T>(
  url: string,
  dateRange: DateRange
): Promise<ApiResponse<T>> => {
  let apiURL = url;

  if (dateRange?.from && dateRange?.to) {
    const fromDate = dateRange.from.toISOString();
    const toDate = dateRange.to.toISOString();
    apiURL = `${url}?fromDate=${fromDate}&toDate=${toDate}`;
  }
  try {
    const response = await api.get<T>(apiURL);
    return { success: true, data: response.data };
  } catch (error) {
    let message = "Something went wrong. Please try again.";
    if (error instanceof Error) {
      const apiError = error as Error & { status?: number };

      if (apiError.status === 404) {
        message = "Invalid request. Please check and try again.";
      }
      if (apiError.status === 400) {
        message = "Not found. The page or resource is missing.";
      }
      if (apiError.status === 500) {
        message = "Server error. Please try again later.";
      }
      return { success: false, error: message, status: apiError.status || 500 };
    }
    return { success: false, error: message, status: 500 };
  }
};
