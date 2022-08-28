import { createContext, FC, ReactNode, useContext } from 'react';

const draggedContext = createContext<string>('');

export const DraggedProvider: FC<{ children: ReactNode; value: string }> = ({
  children,
  value,
}) => <draggedContext.Provider value={value}>{children}</draggedContext.Provider>;

const useDragged = () => {
  const context = useContext(draggedContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within a ActivityProvider');
  }
  return context;
};

export default useDragged;
