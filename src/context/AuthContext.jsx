import React from "react";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword ,signOut} from "firebase/auth";
import { auth } from "../firbase";

// Initialize Firebase Authentication and get a reference to the service

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(console.log("Logged in"))
  };

  const logOutUser = () => {
    setLoading(true);
    console.log("logged out successfully!!!");
    return signOut(auth);
  };

  // auth state Change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      console.log("current user", user);
      setCurrentUser(user);
      setLoading(false);
      console.log("current user changed", user);
    });
    return () => {
      return unSubscribe();
    };
  }, []);
  const userInfo = {currentUser, loading,signInUser,logOutUser};

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
