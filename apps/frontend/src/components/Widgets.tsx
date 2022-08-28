import React from 'react';
import { styled } from '@mui/system';
import MapIcon from '@mui/icons-material/Map';
import { IconButton, Tooltip } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import tw, { styled as twinStyled } from 'twin.macro';

const WidgetsContainer = twinStyled(
  styled('div')`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 10px;
    border-radius: 15px;
    background: ${({ theme }) => theme.palette.background.paper};
    border-color: black;
    width: 70px;
    padding: 10px;
    margin-left: auto;
  `,
  {
    ...tw`shadow`,
  },
);

const Widgets: React.FC = () => (
  <WidgetsContainer>
    <Tooltip title="Contacts">
      <IconButton
        href="https://www.sydney.edu.au/contact-us.html"
        target="_blank"
        color="inherit"
        sx={{ width: '50px', height: '50px' }}
      >
        <PermContactCalendarIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Map">
      <IconButton
        href="https://maps.sydney.edu.au/"
        target="_blank"
        color="inherit"
        sx={{ width: '50px', height: '50px' }}
      >
        <MapIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Support services">
      <IconButton
        href="https://www.sydney.edu.au/study/why-choose-sydney/student-support.html"
        target="_blank"
        color="inherit"
        sx={{ width: '50px', height: '50px' }}
      >
        <FavoriteIcon />
      </IconButton>
    </Tooltip>
  </WidgetsContainer>
);

export default Widgets;
