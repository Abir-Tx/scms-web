import Image from "next/image";
import styles from "./page.module.scss";
import { AnimatedPage } from "./components/animated-page";
import Box from "./components/box/box";
import { Metadata } from "next";
import TabbedBox from "./components/tabbedbox/tabbedbox";

/**
 * Represents the metadata for a page.
 */
export const metadata: Metadata = {
  title: "SCMS Web | Home",
  description: "SCMS Web is a website for the Supply Chain Management System.",
};

export default function Home() {
  return (
    <AnimatedPage>
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

        <section className={`${styles.fourthSection}`}>
          <div className={styles.fourthSectionContent}>
            <div className={styles.fourthSectionText}>
              <h1>Personal Portals For Everyone</h1>
            </div>
            <div className={styles.subsection}>
              <div className={styles.imCon}>
                <Image
                  src="/portal.png"
                  alt="portal"
                  width={300}
                  height={300}
                />
              </div>
              <div className={styles.tabbedBoxContainer}>
                <TabbedBox />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
