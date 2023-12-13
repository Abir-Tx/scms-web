import styles from "./tab-content.module.scss";
export default function TabContent() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        assumenda reiciendis voluptate doloribus libero expedita repellendus
      </p>
      <div className={styles.buttonContainer}>
        <button type="button">Login</button>
      </div>
    </div>
  );
}
