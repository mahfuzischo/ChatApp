import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import React from "react";
 
const Home = () => {
  return (
    <div className="bg-purple-300 h-screen flex items-center justify-center">
      <div className="border-2 border-solid border-white rounded-lg w-2/3 h-4/5 flex">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
