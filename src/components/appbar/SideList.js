import {
    Avatar,
    Box,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
  } from '@mui/material';
  import {
    Dashboard,
    Headphones,
    Logout,
    ManageAccounts,
    PostAdd,
    SupervisorAccount,
    SupportAgent,
    Feed,
    Troubleshoot,
  } from '@mui/icons-material';
  import React, { useMemo, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { Drawer, DrawerHeader } from '../../style/appbar/sideList';
  import { auth } from '../../services/firebase';
  import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
  import { signOut } from 'firebase/auth';
  import { grey } from '@mui/material/colors';
  import ExpandLess from '@mui/icons-material/ExpandLess';
  import ExpandMore from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@emotion/react';
import baseTheme from '../../style/theme';
  
  const SideList = () => {
    const { user, drawer } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const list = useMemo(
      () => [
        {
          title: 'SAV',
          icon: <SupervisorAccount />,
          link: '/sav',
        },
        {
          title: 'Quality',
          icon: <Headphones />,
          link: '/quality',
        },
  
        {
          title: 'welcome call',
          icon: <SupportAgent />,
          link: '/welcome-call',
        },
      ],
      []
    );
  
    async function logout() {
      await signOut(auth);
      dispatch({
        type: 'LOGOUT',
        payload: null,
      });
      history('/login');
    }
  
    const handleClose = () => {
      dispatch({
        type: 'SET_OPEN',
        payload: false,
      });
    };
  
    const [openItem, setOpenItem] = useState(true);
  
    const handleItemClick = () => {
      setOpenItem(!openItem);
    };
    return (
      <div>
        <ThemeProvider theme={baseTheme}>
        <Drawer variant="permanent" open={drawer}>
          <DrawerHeader>
            <IconButton onClick={handleClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
  
          <List >
            <ListItemButton onClick={handleItemClick}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Admin"  />
              {openItem ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openItem} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={() => history('/admin')}>
                  <ListItemIcon>
                    <Feed />
                  </ListItemIcon>
                  <ListItemText primary="Suivi des ventes" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => history('/admin/contract-create')}
                >
                  <ListItemIcon>
                    <PostAdd />
                  </ListItemIcon>
                  <ListItemText primary="Nouveaux contrats" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => history('/stats')}>
                  <ListItemIcon>
                    <Troubleshoot />
                  </ListItemIcon>
                  <ListItemText primary="Statistique" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => history('/admin/users')}
                >
                  <ListItemIcon>
                    <ManageAccounts />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </List>
            </Collapse>
            {list.map((item) => (
              <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: drawer ? 'initial' : 'center',
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: grey[200],
                    },
                    '&.Mui-focusVisible': {
                      backgroundColor: grey[200],
                    },
                  
                  }}
                  onClick={() => history(item.link)}
                  selected={location.pathname === item.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawer ? 3 : 'auto',
                      justifyContent: 'center',
                      color: location.pathname === item.link ? 'black' : 'auto',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: drawer ? 1 : 0,
                      color: location.pathname === item.link ? 'black' : 'auto',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
            <Tooltip title={user?.name || 'name'}>
              <Avatar
                src=""
                {...(drawer && { sx: { width: 100, height: 100 } })}
              />
            </Tooltip>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            {drawer && <Typography>{user?.name || 'name'}</Typography>}
            <Typography variant="body2">{user?.role || 'role'}</Typography>
            {drawer && (
              <Typography variant="body2">{user?.email || 'name'}</Typography>
            )}
            <Tooltip title="LOGOUT" sx={{ mt: 1 }}>
              <IconButton onClick={logout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Drawer>
        </ThemeProvider>
      </div>
    );
  };
  
  export default SideList;
  