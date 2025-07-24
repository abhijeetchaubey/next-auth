"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {

    const [token,setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const VerifyUserEmail = async ()=>{
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true);
        } catch (error) {
            setError(true);
            console.error("Error verifying email:", error);
        }
    }

    useEffect(()=>{
        const urlTOken = window.location.search.split("=")[1];
        setToken(urlTOken || "");
        console.log("Token from URL:", urlTOken);

    },[])

    useEffect(() => {
        if(token.length>0) {
            VerifyUserEmail();
        }
    }, [token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ?`${token}`:"no- token"}</h2>

            {verified &&(
                <div>
                    <h2 className="text-2xl text-green-500">Email Verified Successfully!</h2>
                    <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </div>
            )}
            {error &&(
                <div>
                    <h2 className="text-2xl text-red-500">Error Verifying Email!</h2>
                </div>
            )}
        </div>
    )
}