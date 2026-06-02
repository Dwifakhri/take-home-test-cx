import { apiClient } from '@lib/api/client';
import type { StandardApiResponse } from '@lib/api/types';
import type { DashboardStats, UserActivity } from '../types/dashboard';

export const dashboardService = {
  getStats: (): Promise<StandardApiResponse<DashboardStats>> => {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  },

  // TODO 1: Implementasikan fungsi ini.
  // 1. Tambahkan MSW handler untuk GET /api/dashboard/recent-activity di src/mocks/handlers.ts
  // 2. Uncomment dan lengkapi fungsi di bawah ini
  // 3. Buat hook useRecentActivity di hooks/useRecentActivity.ts (lihat useDashboardStats.ts)
  //
  getRecentActivity: (): Promise<StandardApiResponse<UserActivity[]>> => {
    return apiClient.get<UserActivity[]>('/dashboard/recent-activity');
  },
};
export type { UserActivity };
