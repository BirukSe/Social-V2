"use client"
import { toast } from '@/hooks/use-toast';
import { NextResponse } from 'next/server';
import React, {useEffect, useState} from 'react'
import { useUserStore } from '@/lib/store';

const page = () => {
  const {user}=useUserStore();
  const [data, setData]=useState([]);
  
  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const response=await fetch(`http://localhost:3000/api/state/${user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        
        })
        const result=await response.json();
        if(!result){
          toast({title: "Error interacting with server, Please try again"})
        }
        setData(result);


      }catch(error){
        console.log(error);
       toast({title: "Error connecting with the server, Please try again later"})
      }

    }
    fetchUsers()

  },[])
  return (
    <div className="flex justify-center text-white text-2xl">
        <h1 className="mt-7 font-bold">All Users</h1>
        <h1 className="flex justify-center text-white">{user?.id}</h1>

      
    </div>
  )
}

export default page
