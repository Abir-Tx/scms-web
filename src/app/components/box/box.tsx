import styles from "./box.module.scss";

export default function Box(props: any) {
  return (
    <div className={styles.boxContainer}>
      <div className={styles.box}>
        <h1>{props.text}</h1>
      </div>
    </div>
  );
}
