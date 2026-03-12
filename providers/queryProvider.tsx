'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000, // 1 min
            gcTime: 3 * 60 * 60 * 1000 // 3 hr
        },
        mutations: {
            retry: false
        }
    }
});

export default function QueryProvider({ children }: { children: ReactNode; }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
