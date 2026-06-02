import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { moduleRegistry } from './modules';

const SIDEBAR_WIDTH = 220;

function Sidebar() {
  const navItems = moduleRegistry.getNavItems();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar />
      <List dense>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

function AppRoutes() {
  const routes = moduleRegistry.getRoutes();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {routes.map((route) => {
        const Page = route.element;
        return <Route key={route.path} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
}

export function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight={700} color="inherit">
              StockWise
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar />

        <Box
          component="main"
          sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'grey.50', overflow: 'hidden' }}
        >
          <Toolbar />
          <AppRoutes />
        </Box>
      </Box>
    </Router>
  );
}
