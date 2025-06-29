import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Label } from "./ui/label"
import { cn } from '../lib/utils'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'



const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[emailId,setEmailId]= useState("")
  const[password,setPassword]= useState("")
  const[firstName,setFirstName]= useState("")
  const[lastName,setLastName]= useState("")
  const[gender,setGender] = useState("male")
  const[loginError,SetLoginError] = useState("")
  const[photoUrl, setPhotoUrl]=useState(null)
  const[profilePreview,setProfilePreview]=useState(null)
  const[isLogin,setIsLogin] = useState(true)
  const[showPassword,setShowPassword] = useState(false)
  const handleLogin = async()=>{
   try {
    const res= await axios.post(BASE_URL+"/login",{
      email:emailId,
      password
    },{withCredentials:true})     // cookie milegi ye true krke
   
    dispatch(addUser(res.data))   // ye dispatch login hone m lgega
    return navigate("/")
   } catch (error) {
    SetLoginError(error?.response?.data || "Something went wrong")
    // console.error("Login",error)
   }
  }
  const handleSignUp = async(e)=>{
      e.preventDefault() // Add this
     try {
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', emailId)
    formData.append('password', password)
    formData.append('gender', gender)
    if (photoUrl) {
      formData.append('photoUrl', photoUrl)
    }

    const res = await axios.post(BASE_URL + "/signup", formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(res.data)
    dispatch(addUser(res.data))
    setTimeout(() => navigate("/"), 100)
  } catch (error) {
    console.log(error)
    SetLoginError(error?.response?.data || "Something went wrong")
  }
  }
 
  const handleImageChange=(e)=>{
    const file = e.target.files[0];
    if(file){
      setPhotoUrl(file)
    const reader= new FileReader()
    reader.onload=(e)=>{
      setProfilePreview(e.target.result)
    }
      reader.readAsDataURL(file)

    }
  }
  return(
    <div className=' flex justify-center  py-28  pt-16 w-full px-4'>
    <Card className="w-full max-w-sm  bg-neutral-50/80 backdrop-blur-lg ">
        <h3 className=' text-2xl text-center text-neutral-800 font-semibold -mt-4 '>{isLogin?"Login":"SignUp"}</h3>
      <CardHeader>
        <CardTitle className={'text-sm md:text-xl'}>{isLogin?"Login":"SignUp"} to your account</CardTitle>
      
        <CardAction>
          <button variant="link" className={' -mt-4 mx-4 text-sm hover:text-red-500 active:text-red-500 text-green-500 underline hover:scale-95 cursor-pointer duration-200'}
          onClick={()=>setIsLogin(!isLogin)}
          > {isLogin?"New user? signUp":"Already a user?"} </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-8">
            {!isLogin&&
            (<>
            <div className="grid gap-4">
              <Label htmlFor="text" className={' md:text-xl text-gray-600'}>FirstName</Label>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder='Enter your firstName'
             value={firstName}
             onChange={(e)=>{
              setFirstName(e.target.value)
             }}
              />
            </div>
             <div className="grid gap-4">
              <Label htmlFor="text" className={' md:text-xl text-gray-600'}>lastName</Label>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder='Enter your lastName'
             value={lastName}
             onChange={(e)=>{
              setLastName(e.target.value)
             }}
              />
            </div>
            <div className="grid gap-4">
  <Label htmlFor="gender" className={'md:text-xl text-gray-600'}>Gender</Label>
  <select
    id="gender"
    className={cn(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    )}
    value={gender} // Assuming you have a gender state variable
    onChange={(e) => {
      setGender(e.target.value); // Assuming you have a setGender state setter
    }}
  >  
    <option value="">Select Gender</option>   
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="others">Other</option>
  </select>
            </div>
            {/* Image adding feature */}
             <div className="grid gap-4">
              <Label htmlFor="photoUrl" className={' md:text-xl text-gray-600'}>Profile image</Label>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50  text-sm text-neutral-600  " ,
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder=' '
             type='file'
             accept="image/*"
             onChange={handleImageChange}
              />
              {
                profilePreview&&(
                  <div className=' mt-2'>
                    <img
                    src={profilePreview}
                    alt='preview'
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                    />
                  </div>
                )
              }
            </div>
            </>)
            }
            <div className="grid gap-4">
              <label htmlFor="email" className={' md:text-xl text-gray-600'}>Email</label>
              <input
              id='email'
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
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
                <label htmlFor="password" className={' md:text-xl text-gray-600'}>Password</label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-xs md:text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <div className= {cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600  ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full items-center",
        )}>
                 <input
              id='password'
              className=" w-full outline-none rounded-2xl"
            type={showPassword?"text":"password"}
             placeholder='password'
             value={password}
             onChange={(e)=>{
              setPassword(e.target.value)
             }}
              />
              <span onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaRegEyeSlash/>:<FaEye/>}</span>
              </div>
             
            </div>
      <span className=' text-red-600 underline text-sm  md:text-base '>{loginError}</span>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <button
        type='button'
        className="w-full md:text-lg text-sm bg-emerald-600 hover:bg-emerald-800 cursor-pointer  rounded-lg py-1 text-neutral-50"
        onClick={isLogin?handleLogin:handleSignUp}
        >
         {isLogin?"Login":"SignUp"}
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