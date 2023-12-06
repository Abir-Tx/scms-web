import Image from "next/image";
import styles from "./page.module.scss";
import Head from "next/head";
import { AnimatedPage } from "./components/animated-page";
import Box from "./components/box/box";

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

        <section className={`${styles.secondSection}`}>
          <div className={styles.secondSectionContent}>
            <div className={styles.secondSectionText}>
              <h1>Let Us Handle The Hassles</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                ratione numquam nisi unde, quae repudiandae corporis excepturi
                quia ipsam sapiente?Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Iure aspernatur sequi esse incidunt debitis
                labore excepturi quae impedit eaque voluptatem.
              </p>
            </div>
            <div className={styles.secondSectionImage}>
              <Image
                src="/transport.svg"
                alt="second section image"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        <section className={`${styles.thirdSection}`}>
          <div className={styles.boxContainer}>
            <Box text="Easy" />
            <Box text="Quick" />
            <Box text="Safe" />
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
