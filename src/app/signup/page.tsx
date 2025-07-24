"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false); // 👈 this helps prevent mismatch

  useEffect(() => {
    setHydrated(true); // Now we're definitely on the client
  }, []);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("response",response);
      
      console.log("Signup successful:", response.data);
      if(!response.data.success) {
        toast.error("Signup Failed: " + (response.data.message || "Please check your details"));
        throw new Error(response.data.message || "Signup failed");
      }
      toast.success("Signup Successful");
      router.push("/login");
  } catch (error: unknown) {
    console.error("API error during signup:", error);
    if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
    toast.error("Signup Failed: " + (error.response.data.message || "Please check your details"));
    } else {
      toast.error("Signup Failed: Please check your details");
    }
    // Optionally, set an error state here to display to the user
    console.error("Error details:", error);
  }
   finally {
    setLoading(false);
  }
};

  if (!hydrated) return null; // SSR avoids rendering completely

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading Signup page" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "Sign up" : "Signing Up..."}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
