import React, { useContext } from "react";
import { AuthContext } from "./../context/AuthContext";

const Navbar = () => {
  const { currentUser ,logOutUser} = useContext(AuthContext);
  const handleClick=()=>{
    logOutUser();
  }
  return (
    <div className="items-center bg-purple-900 flex p-3 justify-between h-14 text-purple-200 rounded-l-lg overflow-hidden">
      <span className="font-bold  text-xl">Firebase Chat</span>
      <div className="flex gap-3">
        <img src={currentUser.photoURL} alt="" className="w-8 h-8 object-contain rounded-full" />
        <span>{currentUser.displayName}</span>
        <img
        src="../../images/logout.png"
          className="btn btn-sm text-sm ml-2 font-bold w-6 h-6 cursor-pointer"
          onClick={handleClick}
        />
         
      </div>
    </div>
  );
};

export default Navbar;
