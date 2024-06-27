import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {createServerClient} from "@supabase/ssr";
import {CookieOptions} from "@supabase/ssr";
import prisma from "@/lib/prisma/prisma";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options });
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            return NextResponse.redirect(`${origin}/auth/auth-code-error`);
        }

        const { data, error: userError } = await supabase.auth.getUser();
        if(data.user){
            const { id, email } = data.user;
            if (userError) {
                return NextResponse.redirect(`${origin}/auth/auth-code-error`);
            }
            if(id && email){
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                if(!existingUser){
                    await prisma.user.create({
                        data: {
                            id: id,
                            email: email,
                        }
                    });
                }
            }
        }

        return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
