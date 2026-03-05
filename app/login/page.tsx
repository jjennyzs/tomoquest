"use client"

import { signInWithGoogle } from "@/lib/supabase";

export default function page() {
  return (
    <div>
        <button onClick={signInWithGoogle} type="button">Sign in</button>
    </div>
  )
}
