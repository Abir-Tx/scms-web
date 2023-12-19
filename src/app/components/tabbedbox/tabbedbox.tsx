// TabbedBox.tsx
"use client";
import React, { useState } from "react";
import styles from "./tabbedbox.module.scss";
import TabContent from "./tabContent/tab-content";

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
          Logistics Manager
        </button>
        <button
          className={`${styles.button} ${activeTab === 1 ? styles.active : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Admin
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 0 && (
          <TabContent
            text="Qui ut enim cillum dolor duis ad sunt est officia laborum dolor qui."
            buttonText="Login"
            link="/login"
          />
        )}
        {activeTab === 1 && (
          <TabContent
            text="Deserunt adipisicing nulla qui cillum cupidatat enim id ut mollit nulla reprehenderit."
            buttonText="Admin Login"
            link="/admin/login"
          />
        )}
      </div>
    </div>
  );
};

export default TabbedBox;
