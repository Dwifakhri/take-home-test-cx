import { http, HttpResponse } from 'msw';
import type { StandardApiResponse } from '@lib/api/types';
import type { DashboardStats } from '@modules/dashboard/types/dashboard';
import type { UserActivity } from '@modules/dashboard/types/dashboard';

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

const dashboardStats: DashboardStats = {
  totalUsers: 12,
  activeUsers: 9,
  totalActivity: 47,
};

// ─── Users ────────────────────────────────────────────────────────────────────
//
// NOTE TO CANDIDATE (TODO 1):
// Tambahkan handler untuk GET /api/dashboard/recent-activity di sini.
// Lihat README untuk detail endpoint dan shape data yang diharapkan.
//
// NOTE TO CANDIDATE (TODO 2):
// Handler GET /api/users dan POST /api/users sudah tersedia di bawah.
// Gunakan endpoint ini untuk module user-management kamu.

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  status: 'active' | 'inactive';
}

const users: User[] = [
  { id: 'usr-1',  name: 'Alice Chen',     email: 'alice@stockwise.io',   role: 'admin',    status: 'active'   },
  { id: 'usr-2',  name: 'Bob Martinez',   email: 'bob@stockwise.io',     role: 'manager',  status: 'active'   },
  { id: 'usr-3',  name: 'Carol White',    email: 'carol@stockwise.io',   role: 'operator', status: 'active'   },
  { id: 'usr-4',  name: 'David Kim',      email: 'david@stockwise.io',   role: 'operator', status: 'inactive' },
  { id: 'usr-5',  name: 'Emma Singh',     email: 'emma@stockwise.io',    role: 'manager',  status: 'active'   },
  { id: 'usr-6',  name: 'Frank Obi',      email: 'frank@stockwise.io',   role: 'operator', status: 'active'   },
  { id: 'usr-7',  name: 'Grace Liu',      email: 'grace@stockwise.io',   role: 'admin',    status: 'active'   },
  { id: 'usr-8',  name: 'Henry Park',     email: 'henry@stockwise.io',   role: 'operator', status: 'inactive' },
  { id: 'usr-9',  name: 'Iris Nakamura',  email: 'iris@stockwise.io',    role: 'manager',  status: 'active'   },
  { id: 'usr-10', name: 'James Okonkwo',  email: 'james@stockwise.io',   role: 'operator', status: 'active'   },
  { id: 'usr-11', name: 'Karen Vance',    email: 'karen@stockwise.io',   role: 'operator', status: 'active'   },
  { id: 'usr-12', name: 'Luis Torres',    email: 'luis@stockwise.io',    role: 'manager',  status: 'inactive' },
];
const userActivities: UserActivity[] = [
  { id: 'act-1', userName: 'Alice Chen',    action: 'Logged in',          timestamp: '2024-06-01T08:15:30Z', status: 'success' },
  { id: 'act-2', userName: 'Bob Martinez',  action: 'Viewed dashboard',   timestamp: '2024-06-01T09:00:00Z', status: 'success' },
  { id: 'act-3', userName: 'Carol White',   action: 'Edited profile',     timestamp: '2024-06-01T10:45:20Z', status: 'success' },
  { id: 'act-4', userName: 'David Kim',     action: 'Failed login attempt', timestamp: '2024-06-01T11:30:00Z', status: 'failed'  },
  { id: 'act-5', userName: 'Emma Singh',    action: 'Created report',     timestamp: '2024-06-01T12:00:00Z', status: 'success' },
  { id: 'act-6', userName: 'Frank Obi',     action: 'Deleted item',       timestamp: '2024-06-01T13:20:10Z', status: 'success' },
  { id: 'act-7', userName: 'Grace Liu',     action: 'Logged out',         timestamp: '2024-06-01T14:00:00Z', status: 'success' },
  { id: 'act-8', userName: 'Henry Park',    action: 'Viewed dashboard',   timestamp: '2024-06-01T15:30:45Z', status: 'success' },
  { id: 'act-9', userName: 'Iris Nakamura', action: 'Edited settings',    timestamp: '2024-06-01T16:10:00Z', status: 'success' },
  { id: 'act-10', userName: 'James Okonkwo', action: 'Failed login attempt', timestamp: '2024-06-01T17:00:00Z', status: 'failed'  },
];

// ─── Handlers ─────────────────────────────────────────────────────────────────

export const handlers = [
  // GET /api/dashboard/stats
  http.get('/api/dashboard/stats', () => {
    const response: StandardApiResponse<DashboardStats> = {
      success: true,
      data: dashboardStats,
    };
    return HttpResponse.json(response);
  }),

  // GET /api/users?role=...&status=...
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const role = url.searchParams.get('role') ?? '';
    const status = url.searchParams.get('status') ?? '';

    let result = users;
    if (role) result = result.filter((u) => u.role === role);
    if (status) result = result.filter((u) => u.status === status);

    const response: StandardApiResponse<User[]> = {
      success: true,
      data: result,
      message: `Found ${result.length} users`,
    };
    return HttpResponse.json(response);
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as Omit<User, 'id'>;
    const newUser: User = { ...body, id: `usr-${Date.now()}` };
    users.push(newUser);

    const response: StandardApiResponse<User> = {
      success: true,
      data: newUser,
      message: 'User created successfully',
    };
    return HttpResponse.json(response, { status: 201 });
  }),

  // GET /api/dashboard/recent-activity
  http.get('/api/dashboard/recent-activity', () => {
    const response: StandardApiResponse<UserActivity[]> = {
      success: true,
      data: userActivities,
      message: `Found ${userActivities.length} user activities`,
    };
    return HttpResponse.json(response);
  }),
  
];
