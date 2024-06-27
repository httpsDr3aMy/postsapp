import {createClient} from "@/lib/supabase/supabase";

export async function signInWithGithub() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `https://postsapp-du5gq7wmo-kamils-projects-85981210.vercel.app/auth/callback`,
        },
    })
}