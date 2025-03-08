//@ts-nocheck
"use client";

import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { user, fetchData } = useUserStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) {
      fetchData(); // Fetch user data again if it's null
    }

    const fetchUsers = async () => {
      if (!user) return;

      try {
        //@ts-ignore
        const response = await fetch(`http://localhost:3000/api/state/${user?.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          toast({ title: "Error interacting with server, Please try again" });
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        toast({ title: "Error connecting with the server, Please try again later" });
      }
    };

    fetchUsers();
  }, [user]); // Depend on user to ensure the fetch runs again when user is available

  return (
    <div className="flex flex-col items-center text-white text-2xl mx-7">
      <h1 className="mt-7 font-bold">All Users</h1>
      <div className="mt-14 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((user, index) => {
  const num = Math.floor(Math.random() * 3) + 1; 

  return (
    <div key={index} className="flex flex-col items-center shadow-2xl border-2 border-slate-800 rounded-2xl p-7">
      <div className={`rounded-3xl bg-life-${num} w-12 h-12 text-xl flex justify-center items-center`}>
      
        {
          //@ts-ignore
        user?.full_name?.charAt(0).toUpperCase()}
      </div>
      
      <p>{user?.full_name}</p>
      <p className="text-[11px]">{user?.email}</p>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default Page;
