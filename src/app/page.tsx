import Image from "next/image";
import styles from "./page.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SCMS Web | Home</title>
      </Head>
      <main className={styles.main}>
        <section className={`${styles.firstSection}`}>
          <div className={styles.bgImageCon}>
            <div className={styles.heroTextCon}>
              <h4>Welcome To</h4>
              <h1>SCMS Website</h1>
            </div>
          </div>
        </section>
      </main>
      ;
    </>
  );
}
