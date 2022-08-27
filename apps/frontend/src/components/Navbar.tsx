import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import logo from '../assets/logo.png';

const NavbarBox = styled('div')`
  flex-grow: 1;
  position: fixed;
  margin-left: 0px;
  z-index: 1201;
`;

const StyledNavBar = styled(AppBar)`
  gap: 40px;
  background: ${({ theme }) => theme.palette.primary.main};
  z-index: 1201;
`;

const NavbarTitle = styled(Typography)`
  flex-grow: 1;
  z-index: 1201;
  font-weight: bolder;
`;

const LogoImg = styled('img')`
  height: 46px;
  margin-right: 12.5px;
  margin-top: -2px;
  margin-left: -11.5px;
`;

interface Props {
  handleToggleDarkMode: () => void;
}

const Navbar: React.FC<Props> = ({ handleToggleDarkMode}) => {

  const theme = useTheme();

  return (
    <NavbarBox>
      <StyledNavBar>
        <Toolbar sx={{ gap: '10px' }}>
          <LogoImg src={logo} sx={{ marginRight: '0px' }}/>
          <NavbarTitle>ALLOCATE++</NavbarTitle>
          <IconButton onClick={handleToggleDarkMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {/* TODO: Notifications */}
          {/* <IconButton onClick={() => setIsSendNotification(!isSendNotification)} color="inherit">
            {isSendNotification ? <NotificationsIcon /> : <NotificationsActiveIcon />}
          </IconButton> */}
        </Toolbar>
      </StyledNavBar>
    </NavbarBox>
  );
};

export default Navbar;
