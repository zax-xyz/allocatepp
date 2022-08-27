import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Divider, IconButton, Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import tw, { styled as twinStyled } from 'twin.macro';

const TaskContainer = twinStyled(
  styled('div')`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 15px;
    background: ${({ theme }) => theme.palette.secondary.light};
    border-color: black;
    width: 350px;
    min-height: 650px;
    padding: 10px;
  `,
  {
    ...tw`shadow`,
  },
);

const TaskTitle = styled(Typography)`
  font-weight: bolder;
  margin: 10px;
  margin-right: auto;
`;

const TasksWidget: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TaskContainer>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TaskTitle>TASKS</TaskTitle>
        <IconButton aria-describedby={popoverId} onClick={handleOpen}>
          {open ? <CloseIcon /> : <AddIcon />}
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        ></Popover>
      </div>
      <Divider />
    </TaskContainer>
  );
};

export default TasksWidget;
