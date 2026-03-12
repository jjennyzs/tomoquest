'use client';

import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{ session: Session | null; user: null | User; loading: boolean; }>({ session: null, user: null, loading: true });

const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Initial check (getUser is safer than getSession)
        const initialize = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user) {
                // If user exists, we can grab the session safely
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
            }
            setLoading(false);
        };

        initialize();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

