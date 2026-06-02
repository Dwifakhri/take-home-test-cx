import Card from '@mui/material/Card';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export interface DataGridProps<T extends { id: string }> {
  /** Table rows */
  rows: T[];
  /** Column definitions */
  columns: GridColDef<T>[];
  /** Displays loading overlay */
  loading?: boolean;
}

/**
 * Generic data table organism built on top of MUI DataGrid.
 *
 * Used for displaying tabular data such as recent activity,
 * user lists, audit logs, and admin resources.
 *
 * @example
 * const rows = [
 *   { id: '1', name: 'John Doe', email: 'john@example.com' },
 *   { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
 * ];
 *
 * const columns: GridColDef<(typeof rows)[number]>[] = [
 *   { field: 'name', headerName: 'Name', flex: 1 },
 *   { field: 'email', headerName: 'Email', flex: 1 },
 * ];
 *
 * <DataGrid rows={rows} columns={columns} />
 * <DataGrid rows={rows} columns={columns} loading />
 */
export function DataGrid<T extends { id: string }>({
  rows,
  columns,
  loading = false,
}: DataGridProps<T>) {
  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <MuiDataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
    </Card>
  );
}