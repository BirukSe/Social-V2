"use client"
import React, {useEffect, useState} from 'react'

const Feed = () => {
    const [data, setData]=useState([]);
      const [isLoading, setIsLoading]=useState(false);
      useEffect(()=>{
        const fetchData=async()=>{
          try{
            const response=await fetch('http://localhost:3000/api/new-post', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              
            })
            const result=await response.json();
            if(!result){
              throw new Error("No response from server")
            }
            setData(result);
    
    
    
          }catch(error){
            console.log(error);
          }finally{
            setIsLoading(false);
          }
        }
        fetchData();
    
      },[])
  return (
    <div>
           <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-14 mt-14 p-7">
      
      {data.map((post)=>(
        <div key={post?.id} className="shadow-lg  border-2 border-slate-400 rounded-xl p-7">
            <div className="flex gap-2">
                <div className="rounded-3xl bg-life-3 w-12 h-12 text-xl flex justify-center items-center">
                    {post?.full_name.charAt(0).toUpperCase()}
                </div>
                <h1 className="text-white font-bold flex justify-center items-center text-xl">{post?.full_name}</h1>


            </div>
            <div className="flex gap-3">
            <p className="text-white flex justify-center ml-11">23 days ago</p>
            <p className="text-white">--</p>
            <p className="text-white">{post?.location}</p>

                </div>
                <h1 className="text-white font-bold">{post?.caption}</h1>
                <div>
                    <img src={post?.image_url} className="max-h-[300px] w-[400px]"/>
                    </div>
            <div className="flex justify-between mt-3">
                <img src="heart.png" className="w-10 h-10 invert "/>
                <img src="save.png" className="w-10 h-10 invert"/>




            </div>
            

          </div>
      ))}

     

      
       
      
    </div>
      
    </div>
  )
}

export default Feed
