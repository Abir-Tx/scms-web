import Link from "next/link";
import styles from "./tab-content.module.scss";

interface TabContentProps {
  text: string;
  buttonText: string;
  link: string;
}

export default function TabContent(props: TabContentProps) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{props.text}</p>
      <div className={styles.buttonContainer}>
        <button type="button">
          <Link href={props.link}> {props.buttonText} </Link>
        </button>
      </div>
    </div>
  );
}
