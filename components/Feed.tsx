"use client";
import Loader from '@/app/_components/Loader';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import axiosInstance from '@/lib/axios';
import { useUserStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Feed = () => {
    const router=useRouter();
    const { toast } = useToast();
    const [data, setData] = useState([]);
    const { user, fetchData } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [hearts, setHearts] = useState<{ [key: string]: boolean }>({});
    const [saves, setSaves] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchDataa = async () => {
            console.log("total user", user?.id)
            await fetchData();
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/new-post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                // if(!user || user==undefined || user==null){
                //     router.push('/');

                // }
                const result = await response.json();
                if (!result) {
                    throw new Error("No response from server");
                }
                setData(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDataa();

    }, []);

    const checkState = async (postId: any) => {
        try {
            const response = await fetch('http://localhost:3000/api/state/1', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: user?.id, post_id: postId })
            });
            const result = await response.json();
            if (!result) {
                toast({ title: "Error connecting with server..." });
            }
            console.log("my result is", result);
            return result?.heart;
        } catch (error) {
            console.log(error);
        }
    }
    const checkSaved=async(postId:any)=>{
        try{
            const response=await fetch('http://localhost:3000/api/saved',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id: user?.id, post_id: postId})
            })
            const result = await response.json();
            if (!result) {
                toast({ title: "Error connecting with server..." });
            }
            console.log("my result is", result);
            return result?.save;

        }catch(error){
            console.log(error);
        }
    }

    const handleLike = async (postId: any) => {
        try {
            const response = await fetch('http://localhost:3000/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: user?.id, post_id: postId })
            });
            const result = await response.json();
            if (!result) {
                toast({
                    title: "Failed to like the post, Try again",
                });
                throw new Error("No response from server");
            }
            toast({
                title: "Post liked, feel free to share the post to your friends",
            });
        } catch (error) {
            console.log(error);
        }
    }
    const handleSave=async (postId:any)=>{
        try{
            const response=await fetch('http://localhost:3000/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id: user?.id, post_id: postId})
            })
            const result=await response.json();
            if(!result){
                toast({title: "Error connecting with server"})
            }
            toast({
                title: "Post saved, feel free to share the post to your friends",
            });

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        // Check the initial state for all posts
        data.forEach(async (post) => {
            const heartStatus = await checkState(post?.id);
            setHearts(prevState => ({
                ...prevState,
                [post?.id]: heartStatus
            }));
            const saveStatus=await checkSaved(post?.id);
            setSaves(prevState=>({
                ...prevState,
                [post?.id]: saveStatus
            }))
        });
    }, [data]);

    return (
        <>
            {isLoading && <Loader />}

            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-14 mt-14 p-7 max-w-[5000px] w-full">
                    {data.map((post) => (
                        <div key={post?.id} className="shadow-lg border-2 border-slate-400 rounded-xl p-7 w-full">
                            <div className="flex gap-2">
                                <div className="rounded-3xl bg-life-3 w-12 h-12 text-xl flex justify-center items-center">
                                    {post?.full_name.charAt(0).toUpperCase()}
                                </div>
                                <h1 className="text-white font-bold flex justify-center items-center text-xl">{post?.full_name}</h1>
                            </div>
                            <div className="flex gap-3">
                                <p className="text-white flex justify-center ml-11">
                                    {Math.floor((new Date() - new Date(post?.created_at)) / (1000 * 60 * 60 * 24))} days ago
                                </p>

                                <p className="text-white">--</p>
                                <p className="text-white">{post?.location}</p>
                            </div>
                            <h1 className="text-white font-bold">{post?.caption}</h1>
                            <div>
                                <img src={post?.image_url} className="max-h-[300px] w-[400px]" />
                            </div>
                            <div className="flex justify-between mt-3 inverted">
                                <img 
                                    src={hearts[post?.id] ? "hearted.png" : "hearttt.png"} 
                                    // className={cn('w-10 h-10 inverted')}
                                    className="backdrop-filter-none inverted w-10 h-10 bg-cover"
                                    onClick={() => handleLike(post?.id)} 
                                />
                                <img src={saves[post?.id]?"saved.png":"save.png"} className="w-10 h-10 invert" onClick={()=>handleSave(post?.id)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Feed;
