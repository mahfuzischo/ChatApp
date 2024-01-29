import React from "react";
import { createContext,useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firbase"

// Initialize Firebase Authentication and get a reference to the service

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // auth state Change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("current user", user);
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
