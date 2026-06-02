import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { UserStatus } from '../types/user';
import { StatusBadge } from '@lib/ui';
import { Alert, DataGrid } from '@lib/ui';
import { useListUsers } from '../hooks/useUsers';
import type { User } from '../types/user';
import { useSearchParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

const userStatusColorMap: Record<UserStatus, string> = {
  active: 'success.main',
  inactive: 'error.main',
};

const columns: GridColDef<User>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1.5,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: ({ value }) => (
      <StatusBadge
        status={value as UserStatus}
        colorMap={userStatusColorMap}
      />
    ),
  },
];

export function UserManagementPage() {
const [searchParams, setSearchParams] =
  useSearchParams();

const role =
  searchParams.get('role') ?? undefined;

const status =
  searchParams.get('status') ?? undefined;


const {
  data: users = [],
  isLoading,
  error,
} = useListUsers({
  role: role as User['role'] | undefined,
  status: status as User['status'] | undefined,
});
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        User Management
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role ?? ''}
            label="Role"
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);

              if (e.target.value) {
                params.set('role', e.target.value);
              } else {
                params.delete('role');
              }

              setSearchParams(params);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status ?? ''}
            label="Status"
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);

              if (e.target.value) {
                params.set('status', e.target.value);
              } else {
                params.delete('status');
              }

              setSearchParams(params);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {error && <Alert message={error.message} />}

      <DataGrid
        rows={users}
        columns={columns}
        loading={isLoading}
      />
    </Box>
  );
}