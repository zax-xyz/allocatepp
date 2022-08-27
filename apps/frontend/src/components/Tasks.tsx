import React from 'react';
import { styled } from '@mui/system';
import { Divider, Typography } from '@mui/material';

const TaskContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 15px;
  background: ${({ theme }) => theme.palette.secondary.light};
  border-color: black;
  width: 350px;
  min-height: 600px;
  padding: 10px;
`;

const TaskTitle = styled(Typography)`
  font-weight: bolder;
  margin: 10px;
`;

const TasksWidget: React.FC = () => {
  return (
    <TaskContainer>
      <TaskTitle>TASKS</TaskTitle>
    </TaskContainer>
  );
};

export default TasksWidget;
