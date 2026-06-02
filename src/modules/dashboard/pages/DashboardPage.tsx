import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Activity, Users, Zap } from 'lucide-react';
import { Alert, StatCard } from '@lib/ui';
import { useDashboardStats } from '../hooks/useDashboardStats';

// TODO 1: Import DataGrid dari @lib/ui setelah kamu membuatnya:
import { DataGrid } from '@lib/ui';
//
// TODO 1: Import useRecentActivity setelah kamu membuatnya:
import { useRecentActivity } from '../hooks/useRecentActivity';
//
// TODO 1: Definisikan columns untuk tabel Recent User Activity:
import type { GridColDef } from '@mui/x-data-grid';
import type { UserActivity, UserActivityStatus } from '../types/dashboard';
import { StatusBadge } from '@lib/ui';
//
const activityColorMap: Record<UserActivityStatus, string> = {
  success: 'success.main',
  failed: 'error.main',
};

const activityColumns: GridColDef<UserActivity>[] = [
  { field: 'userName', headerName: 'User', flex: 1 },
  { field: 'action', headerName: 'Action', flex: 1 },
  { field: 'timestamp', headerName: 'Time', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: ({ value }) => (
      <StatusBadge status={value as UserActivityStatus} colorMap={activityColorMap} />
    ),
  },
];

export function DashboardPage() {
  const { data: stats, isLoading, error } = useDashboardStats();

  // TODO 1: Tambahkan hook ini setelah useRecentActivity tersedia:
  const { data: activities = [], isLoading: isLoadingActivity, error: activityError } = useRecentActivity();

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={600}>
          Dashboard
        </Typography>

        {error && <Alert message={error.message} />}

        {/* ── Stat Cards ─────────────────────────────────────────────────── */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            loading={isLoading}
          />
          <StatCard
            title="Active Users"
            value={stats?.activeUsers ?? 0}
            subtitle="Currently active"
            icon={Zap}
            loading={isLoading}
          />
          <StatCard
            title="Total Activity"
            value={stats?.totalActivity ?? 0}
            subtitle="Last 30 days"
            icon={Activity}
            loading={isLoading}
          />
        </Stack>

        {/* ── Recent User Activity ────────────────────────────────────────── */}
        <Box>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Recent User Activity
          </Typography>

          {/* TODO 1: Ganti placeholder di bawah ini dengan DataGrid yang sesungguhnya.
           *
           * Langkah-langkah:
           * 1. Buat DataGrid organism di src/lib/ui/components/organisms/DataGrid/index.tsx
           *    - Lihat StatCard di atas sebagai referensi cara structuring organism
           *    - Export dari src/lib/ui/index.ts
           * 2. Buat MSW handler untuk GET /api/dashboard/recent-activity
           * 3. Buat hook useRecentActivity (lihat useDashboardStats.ts sebagai referensi)
           * 4. Uncomment semua TODO comment di atas, lalu ganti Box placeholder ini dengan:
           *
           * {activityError && <Alert message={activityError.message} />}
           * <DataGrid
           *   rows={activities}
           *   columns={activityColumns}
           *   loading={isLoadingActivity}
           * />
           */}
           
          {activityError && <Alert message={activityError.message} />}
          <DataGrid
            rows={activities}
            columns={activityColumns}
            loading={isLoadingActivity}
          />
        </Box>
      </Stack>
    </Box>
  );
}
