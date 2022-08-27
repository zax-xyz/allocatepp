import React, { useContext, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, Popover, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { Task } from '../interfaces/types';
import { AppContext } from '../contexts/AppContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TasksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 15px;
  background: ${({ theme }) => theme.palette.secondary.light};
  border-color: black;
  width: 350px;
  min-height: 650px;
  padding: 18px;
`;

const TaskTitle = styled(Typography)`
  font-weight: bolder;
  margin: 10px;
  margin-right: auto;
`;

const StyledList = styled(List)`
  padding: 12px 15px;
`;

const StyledListItem = styled(ListItem)`
  padding-top: 8px;
`;

const ExecuteButton = styled(Button)`
  margin-top: 4px;
  height: 40px;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
`;

const TaskContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #e2d9f2;
  border-radius: 15px;
  padding: 19px;
  margin-top: 10px;
`

const TaskDetails = styled('div')`
  display: flex;
  flex-direction: column;
`

const Tasks: React.FC = () => {

  const { createdTasks, setCreatedTasks } = useContext(AppContext);

  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDate, setTaskDate] = useState<Date>(new Date());

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const doCreateTask = () => {

    const newTask: Task = {
      description: taskDescription,
      dueDate: taskDate,
    }

    createdTasks.push(newTask);

    setCreatedTasks(createdTasks);

    console.log(createdTasks);
    
    setTaskDescription('');
    setTaskDate(new Date());

    setAnchorEl(null);
  }

  return (
    <TasksContainer>
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
      >
        <StyledList>
          <StyledListItem>
            <ListItemIcon>
              {/* <StickyNote2Icon sx={{ marginTop: '15px', marginRight: '20px', width: '28px', height: '28px' }}/> */}
              <TextField
                id="outlined-required"
                label="Enter task description"
                onChange={(e) => setTaskDescription(e.target.value)}
                variant="outlined"
                fullWidth
                required
                defaultValue={taskDescription}
                sx={{ width: '234px' }}
              />
            </ListItemIcon>
          </StyledListItem>
          <StyledListItem>
            <LocalizationProvider dateAdapter={AdapterDayjs}>   
              <DatePicker 
                label="Select due date"
                value={taskDate}
                onChange={(newDate) => {
                  if (newDate) setTaskDate(newDate)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </StyledListItem>
        </StyledList>
        <ExecuteButton
          disableElevation
          disabled={taskDescription === ''}
          onClick={doCreateTask}
          sx={{ marginBottom: '8px' }}
        >
          <Add sx={{ marginBottom: '3px', marginRight: '5px' }}/>
          <Typography variant="body2">Add Task</Typography>
        </ExecuteButton>
      </Popover>
      </div>
      <Divider />
      { createdTasks.map((task: Task, index: number) => {
        return (
          <TaskContainer key={index}>
            <TaskDetails>
              <Typography variant='body1'>{task.description}</Typography>
              <Typography variant='body1'>{task.dueDate.toLocaleDateString()}</Typography>
            </TaskDetails>
          </TaskContainer>
        )
      })}
    </TasksContainer>
  );
};

export default Tasks;
