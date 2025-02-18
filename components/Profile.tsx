"use client"
import Loader from '@/app/_components/Loader';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading]=useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/verify', {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await response.json();
                setUser(data.user); // Assuming your API returns { user: {name, email, etc.} }

            } catch (error) {
                console.log("Error fetching profile:", error);
                router.push('/'); // Redirect if unauthorized
            }finally{
                setIsLoading(false);
            }
        };

        fetchData(); // Call the function
    }, [router]);
    console.log("myuser is", user);

    return (
        <>
        {isLoading && <Loader/>}
       
        <div>
            {user ? (
                <div className="flex flex-col gap-8">
                    <h1 className="text-2xl font-bold ">Buragram</h1>
                    <div className="flex">
                        <div className="bg-life-3 rounded-3xl w-12 h-12 text-white">
                            <h1 className="text-black flex justify-center items-center h-full text-3xl font-bold">{user?.fullName?user.fullName.charAt(0):user.email.charAt(0).toUpperCase()}</h1>
                            
                            
                            </div>
                            <h1 className="font-bold text-xl flex ml-1 items-center justify-center">{user?.fullName?user.fullName:user.username}</h1>
                        </div>
                    

                
                </div>
            ) : (
               <Loader/>
            )}
        </div>
        </>
    );
};

export default Profile;
