"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loader from "./Loader"


const formSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

  
const Register = ({setClicked}: {setClicked: (e:boolean)=>boolean}) => {
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState<string>("");
  const router=useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",

      
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
    try{
      setIsLoading(true);
     const response=await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fullName: values.fullName,username: values.username, email:values.email,password: values.password })
     })
     const result=await response.json();
      if(!result){
        
        console.log("Error Occured")
        setError("Error occured, Please try again")
        throw new Error("Go to hell")
      }
      router.push('/home')

    }catch(error:any){
      console.log(error);
      setError(error.message);
    }finally{
      setIsLoading(false);
    }
  

  }
  return (
    <>
    
     <div className="w-full flex flex-col justify-center items-center h-screen text-black">
    <Card className="w-[60%] bg-dark-1 text-white border-none">
    <CardHeader>
    <CardTitle className="text-2xl flex justify-center text-life-1 ">Buragram</CardTitle>
    <CardDescription className="flex justify-center text-lg font-bold text-white">Create a new account</CardDescription>
    <CardDescription className="flex justify-center text-[15px]">To use buragram, please enter your detail</CardDescription>
  </CardHeader>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="biruk" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="biruk@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@biruke" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passoword</FormLabel>
              <FormControl>
                <Input type="password" placeholder="qwerty..." {...field} />
              </FormControl>
              <FormDescription>
                This is your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <Button className="w-full bg-life-2 font-bold text-lg" type="submit">{isLoading?<img src="/loading-circle.svg" className="w-10 h-10 bg-gray-700"/>:"Sign up"}</Button>
              <p>Have an account? <a className="text-blue-500 cursor-pointer" onClick={()=>setClicked(false)}>login</a></p>
              <p className="text-sm text-red-500 italic">{error}</p>
      </form>
    </Form>
  

  

    </Card>
    
  
 



   </div>
    
    </>
  
  )
}

export default Register;
