import { Users } from 'lucide-react';
import type { ModuleConfig } from '../_registry/types';
import { UserManagementPage } from './pages/UserListPage';

export const userManagementModule: ModuleConfig = {
  id: 'user-management',
  label: 'User Management',
  routes: [
    { path: '/user-management', element: UserManagementPage },
  ],
  navItems: [
    { label: 'User Management', path: '/user-management', icon: Users },
  ],
};
