import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-5 mb-4 ${
        message.senderId === currentUser.uid ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col text-gray-500 font-light">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <span>{message.date.toDate().toLocaleTimeString('en-US')}</span>
      </div>
      <div className="messageContent max-w-80 flex flex-col gap-4">
        <p className="bg-white p-3 rounded-br-lg max-w-max">{message.text}</p>
        {message.img && <img src={message.img} alt="" className="w-4/5 border-4 border-slate-400 rounded-md overflow-hidden border-solid" />}
      </div>
    </div>
  );
};

export default Message;
