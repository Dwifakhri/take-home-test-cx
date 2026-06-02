import { useQuery } from '@tanstack/react-query';
import {
  userManagementService,
} from '../services/userManagementService';
import type { GetUsersParams } from '../types/user';


export function useListUsers(params?: GetUsersParams) {
  return useQuery({
  queryKey: ['user-management', 'list-users', params],
  queryFn: async () => {
    const response = await userManagementService.getUsers(params);

    if (!response.success) {
      throw new Error(response.message ?? 'Failed to fetch users');
    }

    return response.data;
  },
});
}