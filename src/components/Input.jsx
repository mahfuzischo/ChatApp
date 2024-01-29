import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firbase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img || file) {
      const storageRef = ref(storage, uuid());

      if (img) {
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("image uploaded");
                console.log("URL: " + downloadURL);
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("file uploaded");
                console.log("URL: " + downloadURL);
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    file: downloadURL,
                  }),
                });
              }
            );
          }
        );
      }
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <>
      <div className=" h-16 mt-0 w-full bg-white pl-4 rounded-br-lg overflow-hidden flex items-center justify-between">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKey}
          className="w-3/5 border-none outline-none text-gray-700 text-lg"
        />
        <div className="send flex items-center gap-3">
          <>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <img
                src="../../images/attach.png"
                alt=""
                className="h-6 cursor-pointer"
              />
            </label>
          </>

          {img ? (
            <div className="relative p-0  w-16 h-16 ">
              <MdCancel
                className=" absolute bg-transparent h-4 w-4 z-50 rounded-full right-0 top-1 cursor-pointer"
                onClick={() => setImg(null)}
              />
              <img
                className=" relative w-full h-16 object-cntain bg-gray-400"
                src={URL.createObjectURL(img)}
                alt=""
              />
            </div>
          ) : (
            <>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
                //new added this line
                accept=".png,.jpeg,.jpg"
              />
              <label htmlFor="file">
                <img
                  src="../../images/img.png"
                  alt=""
                  className="cursor-pointer"
                />
              </label>
            </>
          )}
          <div className="border-none flex items-center px-3 py-3 h-16 text-white bg-transparent ">
            <div className="rounded-full w-14 h-14 flex items-center justify-center  cursor-pointer bg-gray-600">
              {" "}
              <IoSend onClick={handleSend} className=" h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
