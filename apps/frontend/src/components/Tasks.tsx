import React, { useContext, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, Popover, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';
import { CreatedTasks, Task } from '../interfaces/types';
import { AppContext } from '../contexts/AppContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import tw, { styled as twinStyled } from 'twin.macro';

const TasksContainer = twinStyled(
  styled('div')`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 15px;
    background: ${({ theme }) => theme.palette.background.paper};
    border-color: black;
    width: 350px;
    padding: 10px;
  `,
  {
    ...tw`shadow-md`,
  },
);

const TaskTitle = styled(Typography)`
  font-weight: bolder;
  margin: 10px;
  margin-right: auto;
`;

const TaskDiv = styled('div')`
  display: flex;
  flex-direction: row;
`;

const DeleteDiv = styled('div')`
  margin-left: auto; 
  margin-right: 0;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  margin-left: 0;
`;

const StyledList = styled(List)`
  padding: 12px 15px;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
`;

const ExecuteButton = styled(Button)`
  margin-top: 4px;
  height: 40px;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
`;

const TaskWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TaskContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 95%;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 15px;
  padding: 19px;
  margin-top: 10px;
`

const TaskDetails = styled('div')`
  display: flex;
  flex-direction: column;
  width: 250px;
`

const Tasks: React.FC = () => {

  const { createdTasks, setCreatedTasks } = useContext(AppContext);

  const [courseCode, setCourseCode] = useState('');
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

  const deleteTask = (index: number) => {
    setCreatedTasks((oldTasks: CreatedTasks): CreatedTasks => oldTasks.filter(oldTask => {return oldTask.index !== index}))
  }

  const doCreateTask = () => {

    const newTask: Task = {
      index: createdTasks.length === 0 ? 0 : createdTasks[createdTasks.length - 1].index + 1,
      course: courseCode === '' ? 'N/A' : courseCode,
      description: taskDescription,
      dueDate: taskDate,
    }

    setCreatedTasks([...createdTasks, newTask]);

    setCourseCode('');
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
              <TextField
                id="outlined-required"
                label="Enter course code"
                onChange={(e) => setCourseCode(e.target.value)}
                variant="outlined"
                fullWidth
                defaultValue={courseCode}
                inputProps={{ maxLength: 10 }}
                sx={{ width: '234px', marginBottom: '15px' }}
              />
            </ListItemIcon>
            <ListItemIcon>
              <TextField
                id="outlined-required"
                label="Enter task description"
                onChange={(e) => setTaskDescription(e.target.value)}
                variant="outlined"
                fullWidth
                required
                defaultValue={taskDescription}
                inputProps={{ maxLength: 25 }}
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
      <TaskWrapper>
        { createdTasks.map((task: Task) => {
          return (
            <TaskContainer key={task.index}>
              <TaskDiv>
                <TaskDetails>
                  <Typography variant='body1' sx={{ textAlign: 'left' }}><b>Course:</b> {task.course}</Typography>
                  <Typography variant='body1' sx={{ textAlign: 'left' }}><b>Task:</b> {task.description}</Typography>
                  <Typography variant='body1' sx={{ textAlign: 'left' }}><b>Due date:</b> {task.dueDate.toLocaleDateString()}</Typography>
                </TaskDetails>
                <Tooltip title="Delete">
                  <IconButton
                    color="inherit"
                    sx={{ width: '30px', height: '30px' }}
                  >
                    <StyledDeleteIcon onClick={() => deleteTask(task.index)} />
                  </IconButton>
                </Tooltip>
              </TaskDiv>
            </TaskContainer>
          )
        })}
      </TaskWrapper>
    </TasksContainer>
  );
};

export default Tasks;
