import React from 'react';
import { styled } from '@mui/system';
import MapIcon from '@mui/icons-material/Map';
import { IconButton } from '@mui/material';
import tw, { styled as twinStyled } from 'twin.macro';

const WidgetsContainer = twinStyled(
  styled('div')`
    display: flex;
    flex-direction: row;
    gap: 10px;
    background: ${({ theme }) => theme.palette.background.paper};
    border-color: black;
    width: 70px;
    padding: 10px;
    margin-left: auto;
  `,
  {
    ...tw`shadow-md rounded-lg`,
  },
);

const WidgetContainer = styled('div')`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Widgets: React.FC = () => {
  return (
    <WidgetsContainer>
      <WidgetContainer>
        <IconButton
          href="https://maps.sydney.edu.au/"
          target="_blank"
          color="inherit"
          sx={{ width: '50px', height: '50px' }}
        >
          <MapIcon />
        </IconButton>
      </WidgetContainer>
    </WidgetsContainer>
  );
};

export default Widgets;

