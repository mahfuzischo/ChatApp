import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className=" w-2/3">
      <div className="h-12 flex justify-between items-center bg-purple-200 p-3 text-gray-400">
        <span>{data.user?.displayName}</span>
        <div className="flex gap-3">
          <img src="../../images/cam.png" alt="" />
          <img src="../../images/add.png" alt="" />
          <img src="../../images/more.png" alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
