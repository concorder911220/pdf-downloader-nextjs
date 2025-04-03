// src/pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ReportNow Aura</title>
        <meta name="description" content="Generator raportów z konwersacji" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
