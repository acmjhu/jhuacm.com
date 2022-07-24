import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageView } from '../lib/ga';
import '../styles/globals.css';

const siteTitle = 'JHU ACM';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => pageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, []);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <title>JHU ACM</title>
        <meta
          name='description'
          content='This is the Johns Hopkins University Chapter of the Association for Computing Machinery.'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
