import { fetchData } from "@/app/utils/count";
import { UserData } from "./users.types";

interface UsersProps {
  dateRange: { from: Date | null; to: Date | null };
}

export default async function UsersTable({ dateRange }: UsersProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const userData: UserData[] = await fetchData(
    `${process.env.BACKEND_URL}/api/users`,
    validDateRange
  );

  return (
    <div>
      <h1>Users Table</h1>
      {userData.map((user, index) => (
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
