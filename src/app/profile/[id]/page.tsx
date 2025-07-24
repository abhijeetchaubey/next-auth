"use client"; 
import { useSearchParams } from "next/navigation";

export default function userProfile({params}:any) {
    const searchParams = useSearchParams();
    const username= searchParams.get("username");
    const email = searchParams.get("email");
    console.log("Username:", username); 
    console.log("Email:", email);
    // const { id } = params;
    // console.log("User ID from params:", id);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page</p>
            <span className="p-2 ml-2 rounded bg-orange-500 text-2xl">Username: {username}</span>
            <span className="p-2 ml-2 rounded bg-orange-500 text-2xl">Email: {email}</span>
            </div>
    );
}