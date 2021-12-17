import type { NextPage } from "next";
import Head from "next/head";
import SideBar from "../components/SideBar/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spotify 2 with next 12</title>
        <meta
          name="description"
          content="spotify 2 clone for educational purposes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black h-screen">
        <SideBar />
        {/*SideBar */}
        {/*Center */}
      </main>

      <div>{/*Player */}</div>
    </div>
  );
};

export default Home;
