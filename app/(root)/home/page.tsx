import Feed from '@/components/Feed'
import Profile from '@/components/Profile'
import React from 'react'

const page = () => {
  
 
  return (
    <div className="mt-7 w-full">
      <h1 className="font-bold text-2xl flex justify-center text-white ">Home Feed</h1>
      <div className="flex justify-center w-full">
  <Feed />
</div>

      
     
     

    </div>
  
  )
}

export default page
