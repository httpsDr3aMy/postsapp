'use client'
import { addPost } from "@/app/action";
import {useRouter} from "next/navigation";
import {FormEvent} from "react";

const Page = () => {
    const router = useRouter()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const formData= new FormData(form) as FormData;
        const title = formData.get('title') as String;
        const content = formData.get('content') as String;

        if (!title || !content) {
            alert('Please fill in all fields');
        }
        else{
            await addPost(formData);
            await router.push("/")
        }
    };

    return (
        <div className={"w-[350px]"}>
            <h2 className={"text-center font-bold mt-12 text-2xl mb-6"}>Create Post</h2>
            <form className={"flex flex-col gap-3"} onSubmit={handleSubmit}>
                <input type="text" name={"title"} placeholder={"Title of the post..."} className={"ring-2 ring-zinc-200 focus:ring-blue-600 outline-0 rounded-sm p-2 transition-all"}/>
                <textarea name={"content"} className={"max-h-[450px] ring-2 ring-zinc-200 focus:ring-blue-600 outline-0 rounded-sm p-2 "} placeholder={"Content of the post..."}/>
                <button type={"submit"} className={"bg-blue-500 text-slate-50 py-3 rounded-lg"}>Create</button>
            </form>
        </div>
    );
};

export default Page;