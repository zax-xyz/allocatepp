import { createContext, useContext } from 'react';
import type { TimeTable } from '../../types/domain';

// Import google calendar api

const TimeTableContext = createContext<TimeTable | null>(null);

export const TimeTableProvider = TimeTableContext.Provider;

export const useTimeTable = () => {
  const context = useContext(TimeTableContext);
  if (context === undefined) {
    throw new Error('useTimeTable must be used within a TimeTableProvider');
  }

  return context;
};
