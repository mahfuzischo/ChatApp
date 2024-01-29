import React, { useContext } from "react";
import { AuthContext } from "./../context/AuthContext";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="items-center bg-purple-900 flex p-3 justify-between h-14 text-purple-200">
      <span className="font-bold  text-2xl">Firebase Chat</span>
      <div className="flex gap-3">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          className="btn btn-sm bg-slate-300 font-bold"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
