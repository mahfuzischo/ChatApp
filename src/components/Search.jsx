import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firbase";
import { AuthContext } from "./../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const query = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  //when user press enter after inputting a name
  const handleKey = async () => {
    err.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // comparing these to avoid creating 2 chats using same users which will misguide the chats
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection with name of combined id if does not exist
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      //if chat already exists then adding new chat by updating these docs used update nested docs of firebase doc
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="border-b-2 border-solid border-gray-400">
      <div className="p-3">
        <input
          type="text"
          placeholder="Find a user"
          className="bg-transparent  border-none text-white outline-none placeholder:text-gray-200"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="p-3 flex items-center  gap-3 text-white cursor-pointer hover:bg-purple-900 ">
          <img src="" alt="" className="w-12 h-12 rounded-full " />
          <div>
            <span className="font-bold text-lg ">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
