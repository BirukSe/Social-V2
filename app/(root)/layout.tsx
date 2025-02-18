import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex">
        <Navbar/>
        {children}
      
    </div>
  )
}

export default layout;
