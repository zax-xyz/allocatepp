import { useState } from 'react';
import { styled } from '@mui/system';
import { Box, ThemeProvider, useTheme } from '@mui/material';

import tw, { styled as twinStyled } from 'twin.macro';
import { lightTheme, darkTheme } from './constants/theme';
import { Course } from '../types/domain';
import { TimetableProvider } from './hooks/useTimetable';
import AppContextProvider from './contexts/AppContext';

import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import Widgets from './components/Widgets';
import Tabs from './components/Tabs/Tabs';
import SearchBar from './components/SearchBar';

import GlobalStyles from './GlobalStyles';

const StyledApp = styled(Box)`
  height: 100%;
`;

const StyledBox = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = twinStyled(
  styled(Box)`
    flex: 1;
    text-align: center;
    padding-top: 64px;
    transition: background 0.2s, color 0.2s;
    box-sizing: border-box;
    display: flex;
    justifyContent: center;
    color: ${({ theme }) => theme.palette.text.primary};
  `,
  {
    ...tw`max-w-[100rem] w-full mx-auto`,
  },
);

const Content = styled(Box)`
  width: 100%;
  transition: width 0.2s;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  padding: 25px;
`;

const TimetableWrapper = styled(Box)`
  flex: 1;
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

  return (
    <AppContextProvider>
      <TimetableProvider value={timetable}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <StyledApp>
            <StyledBox>
              <Navbar handleToggleDarkMode={() => setDarkMode(!darkMode)} />
              <ContentWrapper>
                <Content>
                  <SearchBar />
                  <TimetableWrapper>
                    <Tasks />
                    <Tabs />
                    <Widgets />
                  </TimetableWrapper>
                </Content>
              </ContentWrapper>
              <Footer />
            </StyledBox>
          </StyledApp>
        </ThemeProvider>
      </TimetableProvider>
    </AppContextProvider>
  );
};

export default App;
