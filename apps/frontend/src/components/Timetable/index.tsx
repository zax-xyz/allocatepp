import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box, styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CourseEvent } from '../../../types/domain';
import useDragged, { DraggedProvider } from '../../hooks/useActivity';
import useTimetable from '../../hooks/useTimetable';

interface Props {}

const StyledTable = styled(Table)`
  th,
  td {
    border: 1px solid #080808;
  }
`;

// Generate an array of hours from 8am to 5pm in string format
const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

const TimetableEvent = ({ event }: { event: CourseEvent }) => {
  return (
    <motion.div
      drag
      style={{
        backgroundColor: '#0370ab',
        borderRadius: '4px',
        width: '100px',
        height: '50px',
      }}
    >
      {event.summary?.split(' ')[1]}
    </motion.div>
  );
};

const TimetableCell = ({ summaries }: { summaries: string[] }) => {
  const timetable = useTimetable();
  const dragged = useDragged();

  if (!timetable) return null;

  const matches = summaries.includes(dragged);

  const StyledCell = styled(TableCell)`
    background-color: ${matches ? '#bbe5fc' : 'white'};
    border: 1px solid #080808;
  `;

  return <StyledCell />;
};

const Timetable: React.FC<Props> = () => {
  const timetable = useTimetable();
  const [dragged, setDragged] = useState('');

  const getSummaries = (hour: string) => {
    if (!timetable) return [];

    const events = Object.keys(timetable).flatMap(key => timetable[key]);

    return events
      .filter(event => {
        const datetime = event?.start?.dateTime;
        if (!datetime) return false;
        return new Date(datetime).getHours() === parseInt(hour);
      })
      .map(event => {
        return event.summary as string;
      });
  };

  return (
    <DraggedProvider value={dragged}>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>Tuesday</TableCell>
            <TableCell>Wednesday</TableCell>
            <TableCell>Thursday</TableCell>
            <TableCell>Friday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timetable && <TimetableEvent event={timetable['COMP2022'][0]} />}
          {hours.map(hour => (
            <TableRow>
              <TableCell>{hour}</TableCell>

              {
                // Generate 5 cells for days
                Array.from({ length: 5 }, (_, i) => i).map(day => (
                  <TimetableCell summaries={getSummaries(hour)} />
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </DraggedProvider>
  );
};

export default Timetable;
