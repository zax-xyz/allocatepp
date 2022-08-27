import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, GlobalStyles, ThemeProvider, useTheme } from '@mui/material';

import { lightTheme, darkTheme } from './constants/theme';
import 'twin.macro';
import { Course } from '../types/domain';
import { TimetableProvider } from './hooks/useTimetable';

import Navbar from './components/Navbar';
import TasksWidget from './components/Tasks';
import Footer from './components/Footer';
import Widgets from './components/Widgets';

const StyledApp = styled(Box)`
  height: 100%;
`;

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled(Box)`
  text-align: center;
  padding-top: 64px;
  transition: background 0.2s, color 0.2s;
  min-height: 50vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Content = styled(Box)`
  width: 2000px;
  max-width: 100%;
  transition: width 0.2s;
  display: grid;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: auto;
  text-align: center;
  padding: 25px;
`;

const TimetableWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const App: React.FC = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [timetable, setTimetable] = useState(null);

  const globalStyle = {
    body: {
      background: theme.palette.background.default,
      transition: 'background 0.2s',
    },
    '::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '::-webkit-scrollbar-track': {
      background: theme.palette.background.default,
      borderRadius: '5px',
    },
    '::-webkit-scrollbar-thumb': {
      background: theme.palette.secondary.main,
      borderRadius: '5px',
      opacity: 0.5,
      transition: 'background 0.2s',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.secondary.dark,
    },
  };

  return (
    <TimetableProvider value={timetable}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles styles={globalStyle} />
        <StyledApp>
          <StyledBox>
            <Navbar handleToggleDarkMode={() => setDarkMode(!darkMode)} />
            <ContentWrapper>
              <Content>
                <TimetableWrapper>
                  <TasksWidget />
                  <Widgets />
                </TimetableWrapper>
              </Content>
            </ContentWrapper>
            <Footer />
          </StyledBox>
        </StyledApp>
      </ThemeProvider>
    </TimetableProvider>
  );
};

export default App;
