import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";

const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  return (
    <div className="bg-blue-300 h-screen flex items-center justify-center">
      <div className=" bg-white p-2 rounded-lg flex flex-col gap-4 items-center">
        <span className="logo text-indigo-800 font-bold text-2xl">
          Firebase Chat
        </span>
        <span className="title text-indigo-800 text-sm">Login</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 border-none w-64 border-b border-blue-300 placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border-none w-64 border-b border-blue-300 placeholder-gray-600"
          />
          <button className="bg-blue-600 text-white p-3 font-bold border-none cursor-pointer">
            Sign in
          </button>
          {err && <span>Something went wrong</span>}
        </form>
        <p className="text-indigo-800 text-sm mt-3">
          You don't have an account?
          <Link to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
