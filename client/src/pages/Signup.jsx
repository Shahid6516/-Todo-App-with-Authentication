import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: " ",
        password: "",
    });

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const signUpHandler = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/register",
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
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "Something went wrong ❌");
        }
    };

    return (
        <div className="bg-[#F9FAFB] h-screen flex items-center justify-center">
            <div className="w-[80%] md:w-1/5 p-5 rounded-2xl border border-zinc-800 ">
                <Input
                    className="w-full p-3 mb-4 border border-zinc-400 rounded-lg text-[#111827] placeholder-gray-500 "
                    value={user.fullName}
                    name="fullName"
                    onChange={changeHandler}
                    type="text"
                    placeholder="Enter your name"
                />
                <Input
                    className="w-full p-3 mb-4 border border-gray-400 rounded-lg text-[#111827] placeholder-gray-500 focus:outline-none"
                    value={user.email}
                    name="email"
                    onChange={changeHandler}
                    type="email"
                    placeholder="Email"
                />

                <Input
                    className="w-full focus:outline-none p-3 mb-4 border border-zinc-400 rounded-lg text-[#111827] placeholder-gray-500"
                    value={user.password}
                    name="password"
                    onChange={changeHandler}
                    type="password"
                    placeholder="Password"
                />
                <Button
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 rounded-lg shadow-sm"
                    onClick={signUpHandler}
                >
                    Login
                </Button>
                <p className="text-center text-md">
                    Already have an account  <span> <Link to={"/login"}>Login</Link> </span>
                </p>
            </div>
        </div>
    );
};


export default Signup