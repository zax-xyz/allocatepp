import { createContext, useState, ReactNode } from 'react';
import storage from '../storage';

export interface AppContextProviderProps {
  children: ReactNode;
}

export interface IAppContext {
  isDarkMode: boolean;
  setIsDarkMode: (newIsDarkMode: boolean) => void;
  isSendNotification: boolean;
  setIsSendNotification: (newIsSendNotification: boolean) => void;
}

export const AppContext = createContext<IAppContext>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  isSendNotification: false,
  setIsSendNotification: () => {},
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(storage.get('isDarkMode'));
  const [isSendNotification, setIsSendNotification] = useState<boolean>(
    storage.get('isSendNotification'),
  );
  const initialContext: IAppContext = {
    isDarkMode,
    setIsDarkMode,
    isSendNotification,
    setIsSendNotification,
  };

  return <AppContext.Provider value={initialContext}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
