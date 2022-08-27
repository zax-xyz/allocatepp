import { createContext, FC, ReactNode, useContext } from 'react';
import type { Timetable } from '../../types/domain';

// Import google calendar api
const timetableContext = createContext<Timetable | null>(null);

interface Props {
  children: ReactNode;
  value: Timetable | null;
}

export const TimetableProvider: FC<Props> = ({ children, value }) => (
  <timetableContext.Provider value={value}>{children}</timetableContext.Provider>
);

const useTimetable = () => {
  const context = useContext(timetableContext);
  if (context === undefined) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
};

export default useTimetable;
