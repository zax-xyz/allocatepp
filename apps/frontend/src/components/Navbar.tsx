import DarkModeIcon from '@mui/icons-material/DarkMode';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const NavbarBox = styled('div')`
  flex-grow: 1;
  position: fixed;
  margin-left: 0px;
  z-index: 1201;
`;

const StyledNavBar = styled(AppBar)`
  gap: 40px;
  background: linear-gradient(220deg, #f0ddf5, #dde7f5);
  z-index: 1201;
`;

const NavbarTitle = styled(Typography)`
  flex-grow: 1;
  z-index: 1201;
  font-weight: bolder;
`;

const Navbar: React.FC = () => {

  const { isDarkMode, setIsDarkMode, isSendNotification, setIsSendNotification } = useContext(AppContext);

  return (
    <NavbarBox>
      <StyledNavBar>
        <Toolbar sx={{ gap: '10px' }}>
          <EventAvailableIcon sx={{ marginRight: '10px' }} />
          <NavbarTitle>ALLOCATE++</NavbarTitle>
          <IconButton onClick={() => {setIsDarkMode(!isDarkMode)}} color="inherit">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton onClick={() => setIsSendNotification(!isSendNotification)} color="inherit">
            {isSendNotification ? <NotificationsIcon /> : <NotificationsActiveIcon />}
          </IconButton>
        </Toolbar>
      </StyledNavBar>
    </NavbarBox>
  );
};

export default Navbar;
