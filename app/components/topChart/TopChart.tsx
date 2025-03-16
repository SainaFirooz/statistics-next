import { TopChartDataInput } from "./users.types";
import { TopChartclient } from "../client/TopChartClient";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";

interface TopChartProps {
  dateRange: DateRange;
  title: string;
  lineColor: string;
  data: TopChartDataInput[];
  percentageChange: number;
}

export async function TopChart({
  dateRange,
  title,
  lineColor,
  data,
  percentageChange = 0,
}: TopChartProps) {
  // if (!data.success) {
  //   return <div>{`${data.error} - ${data.status}`}</div>;
  // }
  const sortedData = [...data].sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  );
  const daysCount =
    dateRange.from && dateRange.to
      ? differenceInDays(dateRange.to, dateRange.from)
      : 0;

  let totalCount = 0;
  const newArr = [];
  for (const item of sortedData) {
    const countValue = totalCount + item.count;
    newArr.push({ ...item, count: countValue });
    totalCount = countValue;
  }

  if (newArr.length > 1) {
    const firstValue = newArr[0].count;
    const lastValue = newArr[newArr.length - 1].count;

    if (firstValue !== 0) {
      percentageChange = ((lastValue - firstValue) / firstValue) * 100;
    }
  }

  return (
    <div>
      <TopChartclient
        data={newArr}
        total={totalCount}
        days={Math.abs(daysCount)}
        title={title}
        percentageChange={percentageChange}
        chartConfig={{
          color: lineColor,
          label: title,
          strokeColor: lineColor,
          fillColor: lineColor,
          dataKey: "count",
        }}
      />
    </div>
  );
}
