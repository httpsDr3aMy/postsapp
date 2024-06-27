import prisma from "@/lib/prisma/prisma";
import PostsLinks from "@/app/components/posts-links";
import {tPost} from "@/types/types";

export default async function Home() {
    const posts = await prisma.post.findMany() as tPost[]
  return (
    <div className={"text-center max-h-full"}>
        <h2 className={"text-center font-bold text-4xl mb-6"}>Posts</h2>
        <PostsLinks posts={posts}/>
    </div>
  );
}
