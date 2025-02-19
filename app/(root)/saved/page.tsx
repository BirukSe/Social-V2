"use client"
import { toast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/store'
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react'

const page = () => {
  const router=useRouter();
  const {user, fetchData}=useUserStore();
  const [data, setData]=useState([]);
  useEffect(()=>{
    const fetchSaves=async()=>{
      await fetchData();
      
      try{
        const response=await fetch(`http://localhost:3000/api/allsave/${user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type':'application/json'
          }
        })
        const result=await response.json();
        if(!result){
          toast({title: "Error connecting with the server, Please try again"})
        }
        setData(result);


      }catch(error){
        console.log(error);
      }finally{
        if(user==undefined){
          router.push('/');
        }
      }

    }
    fetchSaves();

  },[])
  return (
    <div className="text-white mt-14 ml-14">
        <h1 className="font-bold text-2xl">Saved Posts</h1>
        <div>
          {data.map((save)=>(
            <div key={save.id}>
              <img src={save?.image_url}/>

              </div>



          ))}
        </div>
      
    </div>
  )
}

export default page
