import { fetchData } from "@/app/utils/count";
import { IncidentMessagesData } from "./incidentMessages.types";

interface CacheProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function IncidentMessagesChart({ dateRange }: CacheProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const incidentData: IncidentMessagesData[] = await fetchData(
    `${process.env.BACKEND_URL}/api/incidentMessages`,
    validDateRange
  );
  return (
    <div>
      <h1>Incident Messages Chart</h1>
      <ul>
        {incidentData.map((incident, index) => (
          <li key={index}>
            {incident.cache} incident messages from: {incident.fromDate} to:{" "}
            {incident.toDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
