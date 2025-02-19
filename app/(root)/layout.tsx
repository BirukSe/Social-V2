import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar';
import React, { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster"

const Layout = ({ children }: { children: ReactNode }) => {
  const createPopUp=async()=>{

  }
  return (
    <>
      <div className="flex">
        <Navbar />
        
        {/* Sidebar positioned at the top right */}
        <div className="flex gap-3 absolute top-3 right-7">
          
          
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full">
         <main>{children}</main> 
          <Toaster />

        </div>
      </div>
    </>
  );
};

export default Layout;
