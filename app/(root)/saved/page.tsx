"use client";
import Loader from "@/app/_components/Loader";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { user, fetchData } = useUserStore();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSaves = async () => {
      setIsLoading(true);
      if (!user) {
        await fetchData(); // Fetch user data first
      }

      if (!user?.id) return; // Ensure user ID exists before fetching

      try {
        const response = await fetch(`http://localhost:3000/api/allsave/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved posts");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        toast({ title: "Error connecting with the server, Please try again" });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchSaves();
    } else {
      fetchData();
    }
  }, [user, fetchData]); // Depend on `user` so that fetch runs when user data is available

  return (
    <>
      {isLoading && <Loader />}

      <div className="text-white mt-14 ml-14">
        <h1 className="font-bold text-2xl">Saved Posts</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {data.length > 0 ? (
            data.map((save) => (
              <div key={save.id} className="p-4 bg-gray-800 rounded-lg shadow-lg">
                <img
                  src={save?.image_url}
                  alt="Saved Post"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No saved posts found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
