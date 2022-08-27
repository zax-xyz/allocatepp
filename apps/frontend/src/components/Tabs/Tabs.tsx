import React, { useState, useEffect } from 'react';

import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

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

const TabContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-style: solid;
  border-width: 1px;
  padding: 1px 5px 3px 10px;
  width: fit-content;
  height: fit-content;
`;

const StyledCloseIcon = styled(Close)`
  height: 15px;
  margin-top: 5px;
`;

/*
const findTab = (tabs) => {

}

const deleteTab = (tabs, tab) => {

}
*/

const Tab: React.FC<{ tabName: string }> = ({ tabName }) => {
  return (
    <TabContainer>
      <p>{tabName}</p>
      <StyledCloseIcon />
    </TabContainer>
  );
};

const PlusTab: React.FC = () => {
  return (
    <AddIconBox>
      <StyledAddIcon onClick={() => addTab() } />
    </AddIconBox>
  );
};



const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState(
    JSON.parse(localStorage.getItem("tabs")) || []
  )
  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs))
  }, [tabs])


  return (
    <TabsBox>
      <Tab tabName={'test'} />
      <Tab tabName={'test'} />
      <PlusTab />
    </TabsBox>
  )
}

export default Tabs;
