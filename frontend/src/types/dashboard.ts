export interface Stats {
  totalUsers: number;
  apiToday: number;
  errorRate: number;
}

export interface TrendStat {
  value: string;
  trend: number;
}

export interface ChartData {
  days: string[];
  signups: number[];
  apiRequests: number[];
  errorTypes: string[];
  errorCounts: number[];
}
