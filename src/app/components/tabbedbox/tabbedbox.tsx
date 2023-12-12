// TabbedBox.tsx
"use client";
import React, { useState } from "react";
import styles from "./tabbedbox.module.scss";

const TabbedBox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.tabbedBox}>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.button} ${activeTab === 0 ? styles.active : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Button 1
        </button>
        <button
          className={`${styles.button} ${activeTab === 1 ? styles.active : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Button 2
        </button>
        {/* Add more buttons as needed */}
      </div>

      <div className={styles.tabContent}>
        {activeTab === 0 && <p>Content for Button 1</p>}
        {activeTab === 1 && <p>Content for Button 2</p>}
        {/* Add more content sections as needed */}
      </div>
    </div>
  );
};

export default TabbedBox;
