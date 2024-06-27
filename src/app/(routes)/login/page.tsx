import React, {Suspense, useEffect, useState} from 'react';
import {GithubLoginButton} from "@/app/components/buttons";
import {createClient} from "@/lib/supabase/server";

const Page =  async () => {
    const supabase = createClient()

    const {data, error} = await supabase.auth.getUser()

    console.log(data)
    return (
        <form className="text-center space-y-8 font-bold flex flex-col items-center">
            <Suspense fallback={"Loading..."}>
                <p className="text-2xl">{data.user ? "Change your account" : "Currently you are not logged in"}</p>
            </Suspense>
            <GithubLoginButton/>
        </form>
    );
};

export default Page;