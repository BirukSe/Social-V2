import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AuthPage from "@/components/AuthPage";




export default function Home() {
  return (
    <div className="min-h-screen w-full text-white flex">
      <div className="w-full">
      <AuthPage/>

      </div>
   
      <img src="side-img.jpg" className="md:w-[50%] md:block hidden"/>
     



    </div>
    
  );
}
