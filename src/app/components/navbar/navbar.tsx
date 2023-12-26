// Navbar.jsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import Logout from "../logout/logout";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the email is already set in local storage
    const storedEmail = localStorage.getItem("email");
    setIsLoggedIn(!!storedEmail);
  }, []);
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
              <Link href="/lm/shipments">Shipments</Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/lm/transports">Transports</Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/lm/drivers">Drivers</Link>
            </li>
            <li className={styles.navitem}>
              {/* Conditionally show logout  */}
              {isLoggedIn ? <Logout /> : <Link href="/login">Login</Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
