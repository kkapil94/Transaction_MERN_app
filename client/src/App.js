import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import './index.css'
import {useDispatch,useSelector} from 'react-redux'
import { getUser } from "./store/auth";
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
function App() {
  // const auth = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const token = Cookies.get('token')


    async function fetchUser(){
        setLoading(true)
       const res =  await fetch(`${process.env.REACT_API_URL}/user`,{
            headers:{
                Authorization:`bearer ${token}`
            } 
        })
        setLoading(false)
        if(res.ok){
          const user = await res.json()
          console.log(user)
          dispatch(getUser(user))
        }
        setLoading(false)
      }

  useEffect(()=>{
    fetchUser()
  },[])

    if(loading){
      return <p>Loading...</p>
    }
  return (
     <>
        <AppBar/>
        <Outlet/>
     </>
  );
  }
export default App;
