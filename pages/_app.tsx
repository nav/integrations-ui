import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer";

function Integrations({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Integrations UI</title>
        <meta name="description" content="Integrations UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default Integrations;
