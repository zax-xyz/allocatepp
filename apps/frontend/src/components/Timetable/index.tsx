import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box, styled } from '@mui/system';
import useTimetable from '../../hooks/useTimetable';

interface Props {}

const StyledTable = styled(Table)`
  th,
  td {
    border: 1px solid #080808;
  }
`;

const Timetable: React.FC<Props> = () => {
  const timetable = useTimetable();

  // if (!timetable) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center">
  //       <h1>Loading...</h1>
  //     </Box>
  //   );
  // }

  // Object.entries(timetable).find(([key]) => key === '2021-10-01');

  return (
    <div>
      <h1>Timetable</h1>
      <StyledTable>
        <TableHead>
          <TableRow style={{ font: 'bold' }}>
            <TableCell>Time</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>Tuesday</TableCell>
            <TableCell>Wednesday</TableCell>
            <TableCell>Thursday</TableCell>
            <TableCell>Friday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>8:00 - 9:00</TableCell>
            <TableCell>Maths</TableCell>
            <TableCell>English</TableCell>
            <TableCell>Science</TableCell>
            <TableCell>History</TableCell>
            <TableCell>Geography</TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default Timetable;
