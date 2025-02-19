import Feed from '@/components/Feed';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import React from 'react'

const page = () => {
  return (
    <div className="text-white">
      <h1 className="text-white mt-14 text-2xl font-bold ml-7">Search Posts</h1>
      <Input placeholder="Search" className="w-[75%] ml-7 mt-3 text-white"/>
      <div className="mt-14 ml-7">
        <div className="flex justify-between mr-14">
          <h1 className="text-white text-lg font-bold">Popular Today</h1>
          <div className="flex justify-end gap-1">
            <h1>All</h1>
            <Filter/>


          </div>

        </div>
        <Feed/>
      </div>


       
      
    </div>
  )
}

export default page;
