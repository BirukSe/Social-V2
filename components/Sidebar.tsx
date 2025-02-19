"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Navbar from './Navbar'
import Profile from './Profile'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
  
const Sidebar = () => {
    const pathname=usePathname();
  return (
    <div className="flex gap-7">
        <Profile desc="hidden"/>
    
       
  

   
    <div className="sm:hidden text-white top-7">
        <Sheet>
           
  <SheetTrigger className="text-white">
    <img src="app.png" className="filter brightness-0 invert w-10 h-10"/>
  </SheetTrigger>
  <SheetContent>
  <SheetTitle className="flex justify-center text-2xl">
                Buragram
            </SheetTitle>
   
    <div>
        
    <div className="flex flex-1 flex-col gap-6 text-black">
            
            {sidebarLinks.map((link)=>{
                const isActive=pathname===link.route || pathname.startsWith(`${link.route}/`);
                return <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                    'bg-blue-1': isActive
                })}>
                    <Image 
                    src={link.imgUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                    
                    />
                    <p className="text-lg font-semibold ">{link.label}</p>
                   

                </Link>
            })}

        </div>

    </div>

  </SheetContent>
</Sheet>

      
    </div>
    </div>
  )
}

export default Sidebar
