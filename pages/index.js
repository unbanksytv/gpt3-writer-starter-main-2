import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>LIVE THE LIFE</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask Me Anything</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
