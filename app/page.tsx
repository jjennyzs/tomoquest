'use client'

import { signInWithGoogle } from "@/lib/supabase";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to Tomo Quest</h1>
        <p className="text-gray-400 mb-4">Embark on your journey to connect and grow.</p>
        <Link href="/login">
          <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Go to Login Page
          </button>
        </Link>
      </div>
    </div>
  );
}
