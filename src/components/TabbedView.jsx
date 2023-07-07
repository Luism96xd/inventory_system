"use client";
import { useState } from 'react';
import styles from '@/styles/Tabs.module.css';
import { useStore } from '../stores/store';

const TabbedView = ({ tabs, handleOnTabChange}) => {
  const [activeTab, setActiveTab] = useState(0);
  const {setCurrentTab} = useStore.getState();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setCurrentTab(tabIndex);
    handleOnTabChange(tabIndex)
    //console.log(useStore.getState().currentTab)
  };

  const activeTabContent = tabs[activeTab]?.content;

  return (
    <>
      <ul className={styles["tab-list"]}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            className={`${styles["tab"]} ${index === activeTab ? styles["active"] : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className={`${styles["tab-content"]} `}>{activeTabContent}</div>
    </>
  );
}
export default TabbedView;