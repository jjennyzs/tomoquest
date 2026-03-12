'use client'

import { signInWithGoogle } from "@/lib/supabase";

export default function page() {
  return (
    <div>
      <button type="button" onClick={signInWithGoogle} className="text-white">Sign in with Google</button>
    </div>
  );
}
