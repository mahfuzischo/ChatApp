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
      className={`message flex gap-20 mb-20 ${
        message.senderId === currentUser.uid ? "owner" : ""
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
          className="w-40 h-40 rounded-full object-cover"
        />
        <span>just now</span>
      </div>
      <div className="messageContent max-w-80 flex flex-col gap-10">
        <p className="bg-white p-10 rounded-br-10 max-w-max">{message.text}</p>
        {message.img && <img src={message.img} alt="" className="w-50" />}
      </div>
    </div>
  );
};

export default Message;
