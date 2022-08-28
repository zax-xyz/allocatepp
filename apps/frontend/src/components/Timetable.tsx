import React from 'react';
import 'twin.macro';
import { styled } from '@mui/system';
import grid from '../assets/grid.png';
import { Tab } from '../../types/domain';

const TimetableContainer = styled('div')`
  border-style: solid;
  border-width: 1px;
`;

const Timetable: React.FC<{ currTab: Tab }> = ({ currTab }) => (
  <TimetableContainer>
    <img src={grid} alt="GRID" />
  </TimetableContainer>
);

export default Timetable;
