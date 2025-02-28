import { ApiResponse, fetchData } from "@/app/utils/count";
import { UserData } from "./users.types";

interface UsersProps {
  dateRange: { from: Date | null; to: Date | null };
}
export async function UsersChart({ dateRange }: UsersProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };
  const response: ApiResponse<UserData[]> = await fetchData<UserData[]>(
    `${process.env.BACKEND_URL}/api/users`,
    validDateRange
  );
  if (!response.success) {
    return <div>{`${response.error} - ${response.status}`}</div>;
  }
  if (!response.data || response.data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Users chart</h1>
      {response.data.map((user, index) => (
        <ul key={index}>
          <div>
            <strong>Users:</strong> {user.users}
          </div>
          <div>
            <strong>From Date:</strong> {user.fromDate}
          </div>
          <div>
            <strong>To Date:</strong> {user.toDate}
          </div>
        </ul>
      ))}
    </div>
  );
}
