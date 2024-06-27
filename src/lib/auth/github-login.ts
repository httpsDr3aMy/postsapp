import {createClient} from "@/lib/supabase/supabase";

export async function signInWithGithub() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `http://localhost:3000/auth/callback`,
        },
    })
}