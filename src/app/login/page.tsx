"use client"  // everything is on server -site to make it on client we use use-client
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import toast from "react-hot-toast";

export default function Login(){
    const router = useRouter();
    const [user ,setUser] = useState({
        email:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const onLogin = async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login successful:", response.data);
            toast.success("Login Successful");
            router.push("/profile");
        } catch (error) {
            console.error("API error during login:", error);
            toast.error("Login Failed Please check your credentials");
            // Optionally, set an error state here to display to the user
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Login"}</h1>

            <hr>
            </hr>
            <label htmlFor="email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />

            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border=gray-600"
            >login</button>
            <Link href="/signup">visit signup page</Link>
        </div>
        </>
    )
}