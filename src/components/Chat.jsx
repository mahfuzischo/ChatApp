import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className=" w-3/5  h-4/5">
      <div className="h-14 flex justify-between items-center rounded-tr-lg bg-purple-600 p-3 text-gray-200">
      <img src={data.user?.photoURL} className="w-10 rounded-full ml-3 overflow-hidden"/>
        <span>{data.user?.displayName}</span>
        <div className="flex gap-3 items-center">
          <img src="../../images/cam.png" alt="" className="w-6 h-6" />
          <img src="../../images/add.png" alt="" className="w-6 h-6" />
          <img src="../../images/more.png" alt="" className="w-6 h-6" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
