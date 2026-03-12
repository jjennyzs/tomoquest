import { supabase } from "@/lib/supabase";

export default async function fetchProfile(userId: string | undefined | null) {
    if (!userId) throw new Error("User ID is required");
    const { data, error } = await supabase
        .from("profiles")
        .select(`
            id,
            full_name,
            email,
            job_title,
            country,
            talk_to_me_about
        `)
        .eq("id", userId)
        .single();
    if (error) {
        console.error("Supabase Error:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
        });
        throw error;
    }
    return data;
}
