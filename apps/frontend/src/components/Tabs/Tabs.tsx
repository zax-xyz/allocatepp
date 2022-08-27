import React, { useState, useEffect } from 'react';

import { Close, ClosedCaptionDisabled } from '@mui/icons-material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
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
  shouldForwardProp: (prop) => prop !== 'tabColour',
}) < {
  tabColour: string;
}>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-style: solid;
  border-width: 1px;
  padding: 1px 5px 3px 10px;
  width: fit-content;
  height: fit-content;
  background-color: ${({ tabColour }) => tabColour};
  colour: green;
`;

const StyledCloseIcon = styled(Close)`
  height: 15px;
  margin-top: 5px;
`;

const NewTab: React.FC<{ tabName: string, tabId: number, closeTab: any, currentTabId: number, setCurrentTabId: any }> = ({ tabName, tabId, closeTab, currentTabId , setCurrentTabId}) => {
  return (
    <TabContainer tabColour={tabId === currentTabId ? "#123456" : "#000000" } onClick={() => setCurrentTabId(tabId)} >
      <p>{tabName}</p>
      <StyledCloseIcon onClick={() => closeTab(tabId)} />
    </TabContainer>
  );
};

const PlusTab: React.FC<{ addTab: any }> = ({addTab}) => {
  return (
    <AddIconBox>
      <StyledAddIcon onClick={() => addTab() } />
    </AddIconBox>
  );
};

const AllTabs: React.FC = () => {
  const [tabs, setTabs] = useState<Tabs>([])
  const [currentTabId, setCurrentTabId] = React.useState(
    (tabs[0] && tabs[0].id) || ""
  )
  
  const findCurrentTab = () => {
    return tabs.find(tab => {
        return tab.id === currentTabId
    }) || tabs[tabs.length - 1]
  }

  const addTab = () => {
    let newTab: Tab = {
      id: tabs.length === 0 ? tabs.length : tabs[tabs.length - 1].id + 1,
      timetable: {}
    }
    setTabs(prevTabs => [...prevTabs, newTab])
    setCurrentTabId(newTab.id)
  }

  const closeTab = (tabId: number) => {
    setTabs(oldTabs => oldTabs.filter(oldTab => {return oldTab.id !== tabId}))
  }

  useEffect(() => {
    let storedTabs = localStorage.getItem("tabs")
    if (storedTabs !== null) {
      setTabs(JSON.parse(storedTabs))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs))
  }, [tabs])


  return (
    <div>
      <TabsBox>
        {tabs.map(currTab => <NewTab key={currTab.id} tabName={"Timetable" + currTab.id} tabId={currTab.id} closeTab={closeTab} currentTabId={findCurrentTab().id} setCurrentTabId={setCurrentTabId} />)}
        <PlusTab addTab={addTab} />
      </TabsBox>
      <Timetable currTab={findCurrentTab()} />
    </div>
  )
}

export default AllTabs;
