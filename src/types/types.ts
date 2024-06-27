export type tPost = {
    id: string,
    title: string,
    content: string,
    userId: string
}

export type tLikesAndDislikes = {
    likes: { id: string; postId: string | null; userId: string | null; }[];
    dislikes: { id: string; postId: string | null; userId: string | null; }[];
}