"use client"
import Login from '@/app/_components/Login';
import Register from '@/app/_components/Register';
import React from 'react'
import {useState} from 'react'


const AuthPage = () => {
  const [isClicked, setClicked]=useState(false);
  return (
    <div>
      {isClicked ? <Register setClicked={setClicked}/>:<Login setClicked={setClicked}/>}

      
    </div>
  )
}

export default AuthPage
