import { ApiResponse, fetchData } from "@/app/utils/count";
import { IncidentMessagesData } from "./incidentMessages.types";

interface CacheProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function IncidentMessagesTable({ dateRange }: CacheProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<IncidentMessagesData[]> = await fetchData<
    IncidentMessagesData[]
  >(`${process.env.BACKEND_URL}/api/incidentMessages`, validDateRange);
  if (!response.success) {
    return <div>{`${response.error} - ${response.status}`}</div>;
  }
  if (!response.data || response.data.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <h1>Incident Messages Table</h1>
      <ul>
        {response.data.map((incident, index) => (
          <li key={index}>
            {incident.cache} incident messages from: {incident.fromDate} to:{" "}
            {incident.toDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
