import Image from "next/image";
import styles from "./page.module.scss";
import Head from "next/head";
import { AnimatedPage } from "./components/animated-page";

export default function Home() {
  return (
    <AnimatedPage>
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
    </AnimatedPage>
  );
}
