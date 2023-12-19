import React from "react";
import { AnimatedPage } from "../components/animated-page";
import styles from "./login.module.scss";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <AnimatedPage>
        <div className={styles.boxContainer}>
          <h1>Login</h1>
          <div className={styles.box}>
            <form>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
}
