import { useEffect, FC } from "react";
import Modal from "react-modal";
import "../styles/globals.css";
import { AppProps } from "next/app";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
