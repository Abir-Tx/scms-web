// Navbar.jsx
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.navbarBrand}>
          SCMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={styles.navbartogglericon}></span>
        </button>

        <div className={styles.collapse}>
          <ul className={styles.navbarNav}>
            <li className={styles.navitem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/lm/dashboard">Dashboard</Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/shipments">Shipments</Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/lm/transports">Transports</Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/lm/drivers">Drivers</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
