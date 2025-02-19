"use client"
import Loader from '@/app/_components/Loader';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { useUserStore } from '@/lib/store';

const Profile = ({ desc }: { desc: string }) => {
    const router = useRouter();
    const { user,fetchData} = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // ✅ State for dialog

   useEffect(()=>{
    fetchData();

   },[])

    console.log("myuser is", user);

    return (
        <>
            {isLoading && <Loader />}

            <div>
                {user ? (
                    <div className="flex flex-col gap-8">
                        <h1 className={cn("text-2xl font-bold", desc)}>Buragram</h1>
                        <div className="flex items-center">
                            {/* Avatar (Click to Open Dialog) */}
                            <div 
                                className="bg-life-3 rounded-3xl w-12 h-12 text-black flex justify-center items-center cursor-pointer" 
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <h1 className="text-black text-3xl font-bold">
                                    {user?.fullName ? user.fullName.charAt(0) : user.email.charAt(0).toUpperCase()}
                                </h1>
                            </div>
                            
                            {/* User Name */}
                            <h1 className={cn("font-bold text-xl ml-2", desc)}>
                                {user?.fullName ? user.fullName : user.username}
                            </h1>
                        </div>

                        {/* Dialog Component */}
                       <div className="bg-gray-600">
                        
                       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogContent className="bg-gray-900 text-white p-6 rounded-lg h-[400px]">
        <div className="flex flex-col items-center">

        <div 
                                className="bg-life-3 rounded-3xl w-20 h-20 text-black flex justify-center items-center cursor-pointer" 
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <h1 className="text-black text-3xl font-bold">
                                    {user?.fullName ? user.fullName.charAt(0) : user.email.charAt(0).toUpperCase()}
                                </h1>
                            </div>
                            <h1 className={cn("font-bold text-xl ml-2 text-white")}>
                                {user?.fullName ? user?.fullName : user?.username}
                            </h1>
                        
                                <h1 className="mt-1">0 Posts</h1>
                         
                            <Button className="bg-slate-500 mt-7">Edit Profile</Button>
                            <div className="mt-7 flex justify-around w-full">
                                <Button className="bg-slate-800 font-bold">Posts</Button>
                                <Button className="bg-slate-800 font-bold">Liked Posts</Button>


                            </div>

        </div>
       
    </DialogContent>
</Dialog>

                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
};

export default Profile;
