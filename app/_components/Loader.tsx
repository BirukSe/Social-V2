import Image from 'next/image';
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full mx-[25%]">
        <Image 
        src="/loading-circle.svg"
        alt="Loading"
        width={50}
        height={50}
        
        />
      
    </div>
  )
}

export default Loader;
