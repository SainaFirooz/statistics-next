import { ApiResponse } from "@/app/utils/fetchData";

import { AllData } from "@/app/global.types";
import { BarChartComponent } from "../client/BarChartClient";

interface UsersProps {
  data: ApiResponse<AllData>;
}

export default async function PushNotificationChart({ data }: UsersProps) {
  if (!data.success) {
    return <div>{`${data.error} - ${data.status}`}</div>;
  }

  return (
    <BarChartComponent
      users={data.data.users}
      notifications={data.data.notifications}
      incidents={data.data.incidents}
    />
  );
}
