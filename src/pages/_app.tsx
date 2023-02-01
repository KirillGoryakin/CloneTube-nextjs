import { Layout } from '@/components/Layout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'src/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>CloneTube</title>
      </Head>
      
      <Component {...pageProps} />
    </Layout>
  );
}