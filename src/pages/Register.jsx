import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firbase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { ref } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

const Register = () => {
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState([]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const displayName = username;
    const emails = email;
    const pass = password;
    const file = files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, emails, pass);
      //create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //add profile image
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //store user data on firestore database
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email: emails,
              photoURL: downloadURL,
            });
            //Create empty doc for user chats on firestore

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/Login");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className=" bg-blue-300 h-screen flex items-center justify-center">
      <div className=" bg-white p-8 rounded-lg flex flex-col gap-4 items-center">
        <span className=" text-indigo-800 font-bold text-2xl">
          Firebase Chat
        </span>
        <span className=" text-indigo-800 text-sm">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            type="text"
            placeholder="display name"
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 border-none w-64 border-b border-blue-300 placeholder-gray-600"
          />
          <input
            required
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border-none w-64 border-b border-blue-300 placeholder-gray-600"
          />
          <input
            required
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border-none w-64 border-b border-blue-300 placeholder-gray-600"
          />
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.value)}
          />
          <label
            htmlFor="file"
            className="flex items-center gap-4 text-indigo-900 text-sm cursor-pointer"
          >
            <img src="../../images/add-image.png" alt="" className="w-8" />
            <span>Add an image</span>
          </label>
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-2 font-bold border-none cursor-pointer"
          >
            Sign up
          </button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p className="text-indigo-800 text-sm mt-4">
          Already have an account?
          <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
