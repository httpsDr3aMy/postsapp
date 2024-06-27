'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { tPost } from "@/types/types";
import { createClient } from "@/lib/supabase/supabase";
import {useRouter} from "next/navigation";


const PostsLinks = ({ posts }: { posts: tPost[] }) => {
    const router = useRouter()
    const [updatedPosts, setUpdatedPosts] = useState(posts);
    const supabase = createClient()

    useEffect(() => {
        //@ts-ignore
        const channel = supabase
            .channel('table-db-posts')
            .on('postgres_changes', {event: "INSERT", schema: "public", table: "Post"}, (payload) => {
                const post = {
                    id: payload.new.id,
                    title: payload.new.title,
                    content: payload.new.content,
                    userId: payload.new.userId
                }
                setUpdatedPosts(prevPosts => [...prevPosts, post]);
                router.refresh()
            })
            .subscribe();
        return () => {
            channel.unsubscribe();
        };
    }, [updatedPosts, router, supabase]);

    useEffect(() => {
        console.log(updatedPosts)
    }, [updatedPosts]);

    return (
        <div className={"flex flex-col gap-4"}>
            {posts.map((post, key) => (
                <Link href={`/${post.id}`} key={key}>
                    {post.title}
                </Link>
            ))}
        </div>
    );
};

export default PostsLinks;
