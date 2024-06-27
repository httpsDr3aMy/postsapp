import React, {Suspense} from 'react';
import {tPost} from "@/types/types";
import prisma from "@/lib/prisma/prisma";
import {LikeAndDislikeButtons} from "@/app/components/buttons";
import {createClient} from "@/lib/supabase/server";

const Page = async ({params}: any) => {
    const supabase = createClient()
    const {data: {user}, error} = await supabase.auth.getUser()

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    }) as tPost;
    const amountOfLikes = await prisma.like.count()
    const amountOfDislikes = await prisma.dislike.count()
    return (
        <div className={"text-center"}>
            <Suspense fallback={"Loading..."}>
                {post ? (
                    <>
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <p>{post.content}</p>
                        <LikeAndDislikeButtons id={params.postId} isUserLoggedIn={user} />
                        <div className="flex justify-around">
                            <p>{amountOfLikes}</p>
                            <p>{amountOfDislikes}</p>
                        </div>
                    </>
                ) : (
                    <p className={"text-4xl font-bold"}>Post not found</p>
                )}
        </Suspense>
</div>
);
};

export default Page;