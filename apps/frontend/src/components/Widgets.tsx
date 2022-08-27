import React from 'react';
import { styled } from '@mui/system';
import MapIcon from '@mui/icons-material/Map';

const WidgetsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 15px;
  background: ${({ theme }) => theme.palette.secondary.light};
  border-color: black;
  width: 70px;
  min-height: 600px;
  padding: 10px;
  margin-left: auto;
`;

const WidgetContainer = styled('div')`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: 10px;
  background: white;
`

const Widgets: React.FC = () => {
  
  return (
    <WidgetsContainer>
      <WidgetContainer>
        <MapIcon sx={{ width: '30px', height: '30px' }}/>
      </WidgetContainer>
    </WidgetsContainer>
  )
}

export default Widgets;