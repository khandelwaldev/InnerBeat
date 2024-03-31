import React from "react";
import "$/styles/global.css";
import Layout from "$/components/Layout";
import { PlayerProvider } from "$/components/player/PlayerContext";
import { SessionProvider } from "next-auth/react";

const MyMusic = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <PlayerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlayerProvider>
    </SessionProvider>
  );
};

export default MyMusic;
