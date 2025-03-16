export interface CountData {
  count: number;
  fromDate: string;
  toDate: string;
}

export interface AllData {
  subscriptions: CountData[];
  users: CountData[];
  notifications: CountData[];
  incidents: CountData[];
}
