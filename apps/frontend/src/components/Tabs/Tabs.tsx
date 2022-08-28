import React, { useState, useEffect } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { Close, ClosedCaptionDisabled } from '@mui/icons-material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { theme } from 'twin.macro';
import { Tab, Tabs } from '../../../types/domain';
import Timetable from '../Timetable';

const AddIconBox = styled('div')`
  padding: 0px 5px;
`;

const StyledAddIcon = styled(AddIcon)`
  height: 20px;
`;

const TabsBox = styled('div')`
  display: flex;
  flex-direction: row;
`;

const TabContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'tabColour',
})<{
  active: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-style: solid;
  border-width: 1px;
  padding: 5px 10px 5px 12px;
  width: fit-content;
  height: fit-content;
  border-radius: 5px 5px 0 0;
  background: ${({ active }) => (active
    ? 'linear-gradient(220deg, hsl(287.4, 86.4%, 91.4%), hsl(214.7, 86.4%, 91.4%)) !important'
    : '#ffffff')};
  color: ${({ active }) => (active ? 'black' : theme`colors.gray.700`)};
  cursor: pointer;

  &:hover {
    background: linear-gradient(220deg, hsl(287.4, 75%, 96%), hsl(214.7, 75%, 96%));
  }
`;

const StyledCloseIcon = styled(Close)`
  height: 15px;
`;

const NewTab: React.FC<{
  tabName: string;
  tabId: number;
  closeTab: any;
  currentTabId: number;
  setCurrentTabId: any;
}> = ({
  tabName, tabId, closeTab, currentTabId, setCurrentTabId,
}) => (
  <TabContainer
    active={tabId === currentTabId}
    tabColour={tabId === currentTabId ? 'linear-gradient(220deg, #f0ddf5, #dde7f5)' : '#ffffff'}
    onClick={() => setCurrentTabId(tabId)}
    tabIndex={0}
  >
    <p>{tabName}</p>
    <Tooltip title="Close tab">
      <IconButton color="inherit" sx={{ width: '20px', height: '20px' }}>
        <StyledCloseIcon onClick={() => closeTab(tabId)} />
      </IconButton>
    </Tooltip>
  </TabContainer>
);

const PlusTab: React.FC<{ addTab: any }> = ({ addTab }) => (
  <AddIconBox>
    <Tooltip title="New tab">
      <IconButton color="inherit" sx={{ width: '30px', height: '30px' }}>
        <StyledAddIcon onClick={() => addTab()} />
      </IconButton>
    </Tooltip>
  </AddIconBox>
);

const AllTabs: React.FC = () => {
  const [tabs, setTabs] = useState<Tabs>([]);
  const [currentTabId, setCurrentTabId] = React.useState((tabs[0] && tabs[0].id) || '');

  const findCurrentTab = () => tabs.find(tab => tab.id === currentTabId) || tabs[tabs.length - 1];

  const addTab = () => {
    const newTab: Tab = {
      id: tabs.length === 0 ? tabs.length : tabs[tabs.length - 1].id + 1,
      timetable: {},
    };
    setTabs(prevTabs => [...prevTabs, newTab]);
    setCurrentTabId(newTab.id);
  };

  const closeTab = (tabId: number) => {
    setTabs(oldTabs => oldTabs.filter(oldTab => oldTab.id !== tabId));
  };

  useEffect(() => {
    const storedTabs = localStorage.getItem('tabs');
    if (storedTabs !== null) {
      setTabs(JSON.parse(storedTabs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  return (
    <div>
      <TabsBox>
        {tabs.map(currTab => (
          <NewTab
            key={currTab.id}
            tabName={`Timetable${currTab.id}`}
            tabId={currTab.id}
            closeTab={closeTab}
            currentTabId={findCurrentTab().id}
            setCurrentTabId={setCurrentTabId}
          />
        ))}
        <PlusTab addTab={addTab} />
      </TabsBox>
      <Timetable currTab={findCurrentTab()} />
    </div>
  );
};

export default AllTabs;
