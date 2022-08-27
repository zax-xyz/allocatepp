import React from "react"

export default function Sidebar(props) {
    const tabElements = props.tabs.map((tab, index) => (
        <div key={tab.id}>
            <div
                
                className={`title ${
                    tab.id === props.currentTab.id ? "selected-tab" : ""
                }`}
                onClick={() => props.setCurrentTabId(tab.id)}
            >
                <h4 className="text-snippet">Tab {index + 1}</h4>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Tabs</h3>
                <button className="new-tab" onClick={props.newTab}>+</button>
            </div>
            {tabElements}
        </section>
    )
}
