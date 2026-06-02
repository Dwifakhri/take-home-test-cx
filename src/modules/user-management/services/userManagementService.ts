import { apiClient } from '@lib/api/client';
import type { StandardApiResponse } from '@lib/api/types';
import type {
  User,
  GetUsersParams,
} from '../types/user';

export const userManagementService = {
  getUsers: (
    params?: GetUsersParams,
  ): Promise<StandardApiResponse<User[]>> => {
    const searchParams = new URLSearchParams();

  if (params?.role) searchParams.set('role', params.role);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);

  const query = searchParams.toString();

  return apiClient.get<User[]>(
    `/users${query ? `?${query}` : ''}`,
  );
  },
};