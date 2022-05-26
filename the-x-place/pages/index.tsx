import type { NextPage } from "next";
import Router from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const enterSite = () => {
    Router.push("/dashboard");
  };
  return (
    <div className="w-full h-screen bg-gray-300">
      <main className="h-full flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold bg-gray-50 cursor-default">
          Welcome to the XPlace!
        </h1>
        <button className="mt-4 text-xl border-2 p-2" onClick={enterSite}>
          Enter Site!
        </button>
      </main>
    </div>
  );
};

export default Home;
