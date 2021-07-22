import { AppProps } from "next/app";
import React from "react";
import { SEO } from "../components/SEO";
import { GlobalStyles } from "../styles/GlobalStyles";
import { TwinGlobalStyles } from "../styles/TwinGlobalStyles";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <SEO />
      <TwinGlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
