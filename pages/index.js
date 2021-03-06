import Head from 'next/head';
import Layout from './components/Layout';
import MainPage from './components/MainPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>SportByArt</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainPage />
    </>
  );
}
