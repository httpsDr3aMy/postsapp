import {createClient} from "@/lib/supabase/supabase";

export async function signInWithGithub() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `https://postsapp-weld.vercel.app/auth/callback`,
        },
    })
}