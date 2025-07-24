"use client";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation"
import React, { useState } from "react";
import Link from "next/link";
export default function ProfilePage() {
    const router = useRouter();
    const [data,setData] =useState("nothing")
    const [querydata,setQueryData] = useState([])

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("Logout successful:", response.data);
            toast.success("Logout Successful");
            router.push("/login");
        } catch (error:unknown) {
            console.error("API error during logout:", error);
            toast.error("Logout Failed: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log("User details:", res.data);
        setData(res.data.data._id);
        console.log("data", data);

        toast.success("User details fetched successfully");
        setQueryData([res.data.data.username, res.data.data.email]);
        console.log("Query Data:", querydata);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            
            <h2 className="p-3 rounded bg-green-300">{data ==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <h2 className="p-3 rounded bg-green-300">{querydata.length === 0 ?"Nothing":<Link href={{ pathname: `/profile/${data}`, query: {  username: querydata[0], email: querydata[1] } }}> Go to Profile </Link>}</h2>
            <p>This is the profile page. You can view and edit your profile information here.</p>
            <hr/>

            <button
            onClick={logout}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
            >Logout</button>

            <button
            onClick={getUserDetails}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black"
            >Get User Details</button>

        </div>
    );
    
}