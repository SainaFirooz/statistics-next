export interface DataType {
  count: number;
  date: Date;
}

export function formatQueryData(data: DataType[]) {
  return data.map((entry) => ({
    count: Number(entry.count),
    fromDate: entry.date,
    toDate: entry.date,
  }));
}
