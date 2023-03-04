import React from 'react'
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransList from "../components/TransList";
import Cookies from 'js-cookie';
export default function Home() {
  const [trans,setTrans] = useState([])
  const [editTrans,setEditTrans] = useState({})
  async function getTransactions(){
    const token = Cookies.get('token')
    const body = await fetch(`${process.env.REACT_API_URL}/transactions`,{
     headers: {Authorization:`bearer ${token}`}
    })
    const transaction = await body.json()
    setTrans(transaction)
    console.log(transaction)
  }
  useEffect(()=>{
    getTransactions();
  },[])
  return (
    <Container>
        <TransactionForm getTransactions={getTransactions} editTrans={editTrans} setEditTrans={setEditTrans}/>
        <TransList trans={trans} getTransactions={getTransactions} setEditTrans={setEditTrans}/>
    </Container>
  )
}
