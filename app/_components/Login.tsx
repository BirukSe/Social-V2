"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
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


const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

  
const Login = ({setClicked}: {setClicked: (e:boolean)=>boolean}) => {
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState<string>("");
  const router=useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try{
      setIsLoading(true);
      const response=await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: values.email, password: values.password})
      })
      const result=await response.json();

      if(!result){
        console.log("Error Occured");
        setError("Error Occured, Please try again")

      }
      router.push('/home');


    }catch(error:any){
      console.log(error);
      setError(error.message)
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <>
   
       <div className="w-full flex flex-col justify-center items-center h-screen text-black">
    <Card className="w-[60%] bg-dark-1 text-white border-none" >
    <CardHeader>
    <CardTitle className="text-2xl flex justify-center text-life-1 ">Buragram</CardTitle>
    <CardDescription className="flex justify-center text-lg font-bold text-white">Log in to your account</CardDescription>
    <CardDescription className="flex justify-center text-[15px]">Welcome back! Please enter your detail</CardDescription>
  </CardHeader>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                This is your email.
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
              <FormLabel>Password</FormLabel>
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
         <Button className="w-full bg-life-2 font-bold text-lg" type="submit">{isLoading?<img src="/loading-circle.svg" className="w-10 h-10"/>:"Login"}</Button>
         <p>Don't have an account? <a className="text-blue-500 cursor-pointer" onClick={()=>setClicked(true)}>sign-up</a></p>
         <p className="text-sm text-red-500 italic">{error}</p>
      </form>
    </Form>

   

    </Card>
    
  
 



   </div>
    </>

  )
}

export default Login;
