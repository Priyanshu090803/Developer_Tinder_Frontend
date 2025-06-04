import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './Components/Feed'

const App = () => {
  return (
    <div  data-theme="light" className=" w-full h-full" >
      <Provider store={appStore }>
      <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
        <Route path='/' element={<Feed/>}/>
        <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App