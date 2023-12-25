"use client";
import React, { useState, useEffect } from "react";
import { AnimatedPage } from "../components/animated-page";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);

  useEffect(() => {
    // Check if the email is already set in local storage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      // If email is present, redirect to the dashboard
      router.push("/lm/dashboard");

      // Display "Already Logged In" alert
      alert("You are already logged in!");
    } else {
      // If email is not present, show the login form
      setShowLoginForm(true);
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      // Your login logic here

      // Display a success alert
      alert("Login successful. Your session has been saved");

      // Redirect to the dashboard
      router.push("/lm/dashboard");

      // Save the email in local storage
      localStorage.setItem("email", email);
    } catch (error) {
      // Display an error alert
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <AnimatedPage>
        {showLoginForm && (
          <div className={styles.boxContainer}>
            <h1>Login</h1>
            <div className={styles.box}>
              <form>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        )}
      </AnimatedPage>
    </div>
  );
}
