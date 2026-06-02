import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lib/query/keys';
import { dashboardService } from '../services/dashboardService';

const dashboardKeys = createQueryKeys('dashboard');

/**
 * Fetches recent activity data for the dashboard.
 *
 * Pattern to follow when building hooks in user-management:
 * 1. Call the service function inside queryFn
 * 2. Check response.success — throw if false
 * 3. Return response.data
 * 4. Include relevant params in queryKey so React Query refetches when they change
 *
 * @example
 * const { data, isLoading, error } = useRecentActivity();
 */
export function useRecentActivity() {
  return useQuery({
    queryKey: dashboardKeys.custom('recent-activity'),
    queryFn: async () => {
      const response = await dashboardService.getRecentActivity();
      if (!response.success) {
        throw new Error(response.message ?? 'Failed to fetch recent activity');
      }
      return response.data;
    },
  });
}
