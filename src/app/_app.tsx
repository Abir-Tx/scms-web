import { useEffect } from "react";
import Modal from "react-modal";
import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
