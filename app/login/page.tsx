'use client';

import useAuth from '@/hooks/useAuth';
import { signInWithGoogle } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className='text-white'>
        hello {user?.id}
      </div>
      <Link href={'/dashboard'} className='text-white'>Go to dashboard</Link>
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="flex justify-center mb-6">
          <Image src={'/tomoquest_logo.svg'} alt='Tomo quest logo' width={100} height={100} />
        </div>
        <h1 className="text-2xl font-bold mb-4">Tomo Quest</h1>
        <p className="text-gray-400 mb-6">
          Your digital networking passport. Complete missions. Make connections!
        </p>
        <button onClick={signInWithGoogle}
          className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-2"
          >
            <path d="M21.35 11.1h-9.9v2.7h5.7c-.3 1.8-1.5 3.3-3.3 4.2l2.7 2.1c2.1-1.8 3.3-4.5 3.3-7.5 0-.6-.1-1.2-.2-1.5z" fill="#4285F4" />
            <path d="M11.45 21c2.7 0 5-1 6.7-2.7l-2.7-2.1c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2l-2.8 2.1c1.5 3 4.5 5 8.1 5z" fill="#34A853" />
            <path d="M5.85 12.6c-.2-.6-.4-1.2-.4-1.8s.1-1.2.3-1.8l-2.8-2.1c-.6 1.2-1 2.5-1 3.9s.4 2.7 1 3.9l2.9-2.1z" fill="#FBBC05" />
            <path d="M11.45 5.4c1.4 0 2.7.5 3.7 1.4l2.8-2.8c-1.8-1.5-4.1-2.4-6.5-2.4-3.6 0-6.6 2-8.1 5l2.8 2.1c.8-2.4 3-4.3 5.3-4.3z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}