import styles from "./tab-content.module.scss";

interface TabContentProps {
  text: string;
  buttonText: string;
}

export default function TabContent(props: TabContentProps) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{props.text}</p>
      <div className={styles.buttonContainer}>
        <button type="button">{props.buttonText}</button>
      </div>
    </div>
  );
}
