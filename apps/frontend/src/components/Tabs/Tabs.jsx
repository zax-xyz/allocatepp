import React, { useEffect } from 'react';

import Sidebar from './Sidebar';
import Editor from './Editor';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';
import { nanoid } from 'nanoid';

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

const Tabs = () => {
  const [tabs, setTabs] = React.useState(JSON.parse(localStorage.getItem('tabs')) || []);
  const [currentTabId, setCurrentTabId] = React.useState((tabs[0] && tabs[0].id) || '');

  React.useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  function createNewTab() {
    const newTab = {
      id: nanoid(),
      body: "# Type your markdown tab's title here",
    };
    setTabs(prevTabs => [newTab, ...prevTabs]);
    setCurrentTabId(newTab.id);
  }

  function updateTab(text) {
    setTabs(oldTabs =>
      oldTabs.map(oldTab => {
        return oldTab.id === currentTabId ? { ...oldTab, body: text } : oldTab;
      }),
    );
  }

  function findCurrentTab() {
    return (
      tabs.find(tab => {
        return tab.id === currentTabId;
      }) || tabs[0]
    );
  }

  return (
    <main>
      {tabs.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            tabs={tabs}
            currentTab={findCurrentTab()}
            setCurrentTabId={setCurrentTabId}
            newTab={createNewTab}
          />
          {currentTabId && tabs.length > 0 && (
            <Editor currentTab={findCurrentTab()} updateTab={updateTab} />
          )}
        </Split>
      ) : (
        <div className="no-tabs">
          <h1>You have no tabs</h1>
          <button className="first-tab" onClick={createNewTab}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default Tabs;
