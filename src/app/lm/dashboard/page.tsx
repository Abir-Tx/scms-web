import styles from "./dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.dashCon}>
      <div className={styles.quickviewContainer}>
        <div className={styles.statCon}>
          <div className={styles.statHeader}>
            <span>Drivers</span>
          </div>
          <div className={styles.statConBody}>
            <span>5</span>
          </div>
        </div>

        <div className={styles.statCon}>
          <div className={styles.statHeader}>
            <span>Vehicles</span>
          </div>
          <div className={styles.statConBody}>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
