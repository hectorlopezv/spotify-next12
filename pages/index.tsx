import type { NextPage } from "next";
import Head from "next/head";
import Center from "../components/Center/Center";
import SideBar from "../components/SideBar/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden ">
      <main className="flex">
        <SideBar />
        <Center />
      </main>

      <div>{/*Player */}</div>
    </div>
  );
};

export default Home;
