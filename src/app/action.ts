'use server'
import prisma from "@/lib/prisma/prisma";
import {createClient} from "@/lib/supabase/server";
import {revalidatePath} from "next/cache";
import {tLikesAndDislikes} from "@/types/types";

export const addPost = async (formData: FormData) => {
    const supabase = createClient()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const {data: {user}, error} = await supabase.auth.getUser()
    if(user && user.id){
        const { id } = user
        await prisma.post.create({
            data: {
                title: title,
                content: content,
                userId: id
            }});
    }
}

export const addLike = async (postId: string) => {
    const supabase = createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    const userId = user?.id
    if(userId){
        const likesAndDislikes = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                likes: true,
                dislikes: true,
            }
        }) as tLikesAndDislikes
        const {dislikes} = likesAndDislikes
        const userDisliked = dislikes.some(dislike => dislike.userId === userId);

        if (userDisliked) {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    dislikes: {
                        deleteMany: { userId }
                    },
                    likes: {
                        create: { userId }
                    }
                }
            });
        } else {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    likes: {
                        create: { userId }
                    }
                }
            });
        }
        revalidatePath(`/${postId}`)
    }
}

export const addDislike = async (postId: string) => {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user?.id;
    if(userId){
        const likesAndDislikes = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                likes: true,
                dislikes: true,
            }
        }) as tLikesAndDislikes;

        const { likes } = likesAndDislikes;

        const userLiked = likes.some(like => like.userId === userId);

        if (userLiked) {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    likes: {
                        deleteMany: { userId }
                    },
                    dislikes: {
                        create: { userId }
                    }
                }
            });
        } else {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    dislikes: {
                        create: { userId }
                    }
                }
            });
        }
    }
    revalidatePath(`/${postId}`)
};