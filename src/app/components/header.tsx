'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {createClient} from "@/lib/supabase/supabase";
import {User} from "@supabase/auth-js";

type tLink = {
    href: string,
    label: string,
}

const links: tLink[] = [
    { href: '/', label: 'Posts' },
    { href: '/create-post', label: 'Create post' },
    { href: '/login', label: 'Login' },
]

const Header = () => {
    const supabase = createClient()
    const [user, setUser] = useState<User>()
    const pathname = usePathname()
    const getUser = async () => {
        const {data: {user}, error} = await supabase.auth.getUser()
        if(user){
            setUser(user)
        }
    }
    useEffect(() => {
        getUser()
    }, [getUser()]);
    return (
        <div className={"flex flex-col items-center gap-4 md:flex-row md:gap-0 md:justify-between py-8 px-32 bg-zinc-50 border-b-2 border-b-zinc-100"}>
            <h1 className="text-2xl font-bold">Postify</h1>
            <ul className="flex gap-12">
                {links.map(({ href, label }: tLink, key: number) => {
                    return (
                        <li key={key}>
                            {!user && href === '/create-post' ? (
                                <Link
                                    className={`text-md pointer-events-none ${href === pathname ? "text-zinc-900" : "text-zinc-400"}`}
                                    href={href}
                                >
                                    {label}
                                </Link>
                            ) : (
                                <Link
                                    className={`text-md ${href === pathname ? "text-zinc-900" : "text-zinc-400"}`}
                                    href={href}

                                >
                                    {label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Header;