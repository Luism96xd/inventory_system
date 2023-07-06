"use client";
import { useState } from 'react';
import styles from '@/styles/Tabs.module.css';

const TabbedView = ({ tabs })=> {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
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