import Head from 'next/head';

const Home = () => {
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>LIVE THE LIFE</h1>
          </div>
          <div className="header-subtitle">
            <h2>LFG ANON, ASK ME ANYTHING</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing here" className="prompt-box" />
        </div>
      </div>
    </div>
  );
};

export default Home;
