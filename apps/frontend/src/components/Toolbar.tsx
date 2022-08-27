import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { ThemeType } from '../constants/theme';
import '@fontsource/montserrat';

const ToolbarBox = styled('div')`
  flex-grow: 1;
  margin-left: 0px;
  z-index: 1201;
  display: flex;
  gap: 30px;
  padding: 25px;
  background: ${({ theme }) => theme.palette.background.default};
  width: 100%;
  font-family: 'Montserrat';
  font-style: bold;
  position: fixed;
  margin-top: 100px;
`;

const StyledHeader = styled('h1')`
  font-size: 20px;
  font-weight: bolder;
`;

const Settings = styled('div')``;

const Toolbar: React.FC = () => {
  const theme = useTheme<ThemeType>();
  return (
    <ToolbarBox>
      {/* <EventAvailableIcon sx={{ width: '30px', height: '30px' }}/>
      <EventAvailableIcon sx={{ width: '30px', height: '30px' }}/>
      <EventAvailableIcon sx={{ width: '30px', height: '30px' }}/> */}
    </ToolbarBox>
  );
};

export default Toolbar;
