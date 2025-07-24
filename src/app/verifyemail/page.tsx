"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const urlToken = window.location.search.split("=")[1];
        if (!urlToken) return;
        setToken(urlToken);

        await axios.post("/api/users/verifyemail", { token: urlToken });
        setVerified(true);
      } catch (err) {
        setError(true);
        console.error("Error verifying email:", err);
      }
    };

    verifyEmail();
  }, []); // Runs once on mount

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl text-green-500">Email Verified Successfully!</h2>
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-500">Error Verifying Email!</h2>
        </div>
      )}
    </div>
  );
}
