import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Label } from "./ui/label"
import { cn } from '../lib/utils'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'


const EditProfile = ({user}) => {
    
      const[firstName,setFirstName]= useState(user.firstName)
      const[lastName,setLastName]= useState(user.lastName)
      const[gender,setGender]= useState(user.gender)
      const[age,setAge]= useState(user.age)
      const[photoUrl,setPhotoUrl]= useState(user.photoUrl)
      const[about,setAbout]= useState(user.about)
      const[skills,setSkills]= useState(user.skills)
      const[Error,SetError] = useState("")
      const [toast,setToast] = useState(false)
      const dispatch = useDispatch()
      const saveProfile = async()=>{
        SetError("")
        try {
        const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0) : [];
        const res= await axios.patch(BASE_URL+"/profile/edit",
            {
           firstName,
           lastName,
           gender,
           age,
           photoUrl,
           about,
           skills:skillsArray
        },{withCredentials:true})
        dispatch(addUser(res?.data?.data))
        setToast(true)
        setTimeout(() => {
            setToast(false)
        }, 3000);
        } catch (error) {
            SetError(error.response.data)
            console.log(error)
        }

      }
    return(
    <div className=' md:flex h-full w-full justify-center pb-10 '>
    <div className=' flex justify-center md:py-28 pt-16 md:w-1/3 px-4 '>
    <Card className="w-full max-w-sm  bg-neutral-50/80 backdrop-blur-lg shadow-xl">
      <CardHeader>
        <CardTitle className={'text-sm md:text-xl'}>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
    
          <div className="flex flex-col gap-3">
            <div className="grid gap-4">
              <Label htmlFor="email" className={' md:text-xl text-gray-600'}>firstName</Label>
              <input
              type='string'
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder={user.firstName}
             value={firstName}
             onChange={(e)=>{
              setFirstName(e.target.value)
             }}
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password" className={' md:text-xl text-gray-600'}>lastName</Label>
                
              </div>
              <input
              type='string'
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600  ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        )}
             placeholder=''
             value={lastName}
             onChange={(e)=>{
              setLastName(e.target.value)
             }}
            
              />
            </div>
             <div className="grid gap-4">
              <Label htmlFor="email" className={' md:text-xl text-gray-600'}>gender</Label>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder=''
             value={gender}
             onChange={(e)=>{
              setGender(e.target.value)
             }}
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password" className={' md:text-xl text-gray-600'}>age</Label>
                
              </div>
              <input
              type='number'
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600  ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        )}
             placeholder=''
             value={age}
             onChange={(e)=>{
              setAge(e.target.value)
             }}
            
              />
            </div>
             <div className="grid gap-4">
              <Label htmlFor="email" className={' md:text-xl text-gray-600'}>photoUrl</Label>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive")}
             placeholder=''
             value={photoUrl}
             onChange={(e)=>{
              setPhotoUrl(e.target.value)
             }}
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password" className={' md:text-xl text-gray-600'}>about</Label>
                
              </div>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600  ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        )}
             placeholder=''
             value={about}
             onChange={(e)=>{
              setAbout(e.target.value)
             }}
            
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password" className={' md:text-xl text-gray-600'}>skills</Label>
                
              </div>
              <input
              className={cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg text-sm text-neutral-600  ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        )}
             placeholder=''
             value={skills}
             onChange={(e)=>{
              setSkills(e.target.value)
             }}
            
              />
            </div>
      <span className=' text-red-600 underline text-sm  md:text-base '></span>
      <span className=' text-red-600 underline text-sm  md:text-base '>{Error}</span>

          </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <button className="w-full md:text-lg text-sm bg-neutral-300 text-black hover:bg-neutral-400 cursor-pointer duration-300 delay-200  rounded-lg py-1 "
        onClick={saveProfile}
        >
          Save Profile
        </button>
        {/* <Button variant="outline" className="w-full md:text-lg text-sm cursor-pointer">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
    </div>
    <div className=' md:w-1/4 h-full flex flex-col md:gap-3 md:py-24 py-10'>
        <p className=' ml-10 text-amber-700' >Live preview</p>
        <UserCard user={{firstName,lastName,gender,age,photoUrl,about,skills}}/>
    </div>
   {toast&& <div className="toast toast-top mt-14 toast-center">
  <div className="alert alert-success">
    <span className=' text-sm'>Profile Updated successfully!</span>
  </div>
</div>}
    </div>
  )
}

export default EditProfile