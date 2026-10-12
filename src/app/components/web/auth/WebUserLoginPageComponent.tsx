"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWebAuth } from "@/context/WebAuthContext";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/utils/utils";

export default function WebUserLoginPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useWebAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!isValidEmail(email)) {
      alert("Enter a valid Email!");
      return;
    }

    if (!password || password.length < 6) {
      alert("Password requirement is not fulfilled!");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({
        email: email,
        password: password,
      });
    } catch (err: any) {
      alert(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-3 mx-auto" style={{ maxWidth: "440px" }}>
      <div className="rounded-2xl border border-[#eddcc6] bg-[#fbf6ee] p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-3 no-underline">
            <div className="bg-black py-2 px-4 rounded-xl inline-block border border-zinc-800 shadow-xs">
              <img src="/assets/logo.png" alt={siteConfig.name} className="h-9 w-auto mx-auto object-contain" />
            </div>
          </Link>
          <h2 className="heading-font text-xl font-bold text-[#de142a] mb-1">
            Devotee Account Login
          </h2>
          <p className="text-xs text-gray-700">
            Sign in to view orders and manage sacred seva
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#de142a] focus:outline-hidden disabled:bg-gray-100 disabled:opacity-75"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-800">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-[#de142a] hover:underline no-underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#de142a] focus:outline-hidden disabled:bg-gray-100 disabled:opacity-75"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg py-2.5 text-sm font-semibold border-0 transition flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed opacity-75 shadow-none"
                : "bg-[#de142a] text-white hover:bg-[#b90f22] cursor-pointer shadow-sm"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Signing In...</span>
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#de142a]/20">
          <p className="text-xs text-gray-700 mb-0">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#de142a] font-semibold hover:underline no-underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

