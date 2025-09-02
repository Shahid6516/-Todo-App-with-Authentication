import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: " ",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
        // if(res.data.success){
        // alert(res.data.message)

        // }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="bg-[#F9FAFB] h-screen flex items-center justify-center">
      <div className="w-[80%] md:w-1/5 p-5 rounded-2xl border border-zinc-800 ">
        <Input
          className="w-full p-3 mb-4 border border-zinc-400 rounded-lg text-[#111827] placeholder-gray-500 "
          value={user.value}
          name="email"
          onChange={changeHandler}
          type="text"
          placeholder="Email"
        />

        <Input
          className="w-full focus:outline-none p-3 mb-4 border border-zinc-400 rounded-lg text-[#111827] placeholder-gray-500"
          value={user.value}
          name="password"
          onChange={changeHandler}
          type="password"
          placeholder="Password"
        />
        <Button
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 rounded-lg shadow-sm"
          onClick={loginHandler}
        >
          Login
        </Button>
        <p className="text-center text-md">
          Don't have an account  <span> <Link  to={"/signup"}>Signup</Link> </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
