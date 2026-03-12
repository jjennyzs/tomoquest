import fetchProfile from "@/queries/getProfile";
import { useQuery } from "@tanstack/react-query";

export default function useProfile(
    userId: string | undefined | null,
    options = {},
) {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: () => fetchProfile(userId),
        enabled: !!userId,
        staleTime: 60_000, //1 min
        ...options,
    });
}
