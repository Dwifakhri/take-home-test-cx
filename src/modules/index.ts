import { moduleRegistry } from './_registry/registry';
import { dashboardModule } from './dashboard/module';

moduleRegistry.register(dashboardModule);

// TODO 2: Setelah membuat user-management module, import dan register di sini:
import { userManagementModule } from './user-management/module';
moduleRegistry.register(userManagementModule);

export { moduleRegistry };