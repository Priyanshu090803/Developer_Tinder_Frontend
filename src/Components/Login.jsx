import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '@/utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '@/utils/constants'



const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[emailId,setEmailId]= useState("priyanshu@gmail.com")
  const[password,setPassword]= useState("Priyanshu@123")
  const handleLogin = async()=>{
   try {
    const res= await axios.post(BASE_URL+"/login",{
      email:emailId,
      password
    },{withCredentials:true})     // cookie milegi ye true krke
   
    dispatch(addUser(res.data))
    return navigate("/")
   } catch (error) {
    console.error("Login",error)
   }
  }
  return(
    <div className=' flex justify-center md:py-28 pt-16 w-full px-4'>
    <Card className="w-full max-w-sm  bg-neutral-50/80 backdrop-blur-lg ">
      <CardHeader>
        <CardTitle className={'text-sm md:text-xl'}>Login to your account</CardTitle>
        <CardDescription className={' '}>
          Enter your email and password to login
        </CardDescription>
        <CardAction>
          <Button variant="link" className={' -mt-4  text-sm md:text-lg'}>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-8">
            <div className="grid gap-4">
              <Label htmlFor="email" className={' md:text-xl text-gray-600'}>Email</Label>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder='@example.com'
             value={emailId}
             onChange={(e)=>{
              setEmailId(e.target.value)
             }}
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password" className={' md:text-xl text-gray-600'}>Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-xs md:text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600  ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        )}
             placeholder='password'
             value={password}
             onChange={(e)=>{
              setPassword(e.target.value)
             }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <button className="w-full md:text-lg text-sm bg-emerald-600 hover:bg-emerald-800 cursor-pointer  rounded-lg py-1 text-neutral-50"
        onClick={(handleLogin)}
        >
          Login
        </button>
        {/* <Button variant="outline" className="w-full md:text-lg text-sm cursor-pointer">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
    </div>
  )
}
 

export default Login