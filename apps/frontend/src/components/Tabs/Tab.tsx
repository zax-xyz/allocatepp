import React from 'react';

import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';

const TabContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-style: solid;
  border-width: 1px;
  padding: 3px 10px;
  width: fit-content;
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

export default Tab;
