import React from 'react';
import { styled } from '@mui/system';
import { Tab } from '../../types/domain';

const TimetableContainer = styled('div')`
  border-style: solid;
  border-width: 1px;
`;

const Timetable: React.FC<{ currTab: Tab }> = ({ currTab }) => {
  return (
    <TimetableContainer>
      hello
    </TimetableContainer>
  );
};

export default Timetable;
