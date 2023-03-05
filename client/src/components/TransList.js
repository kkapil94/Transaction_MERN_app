import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import {EditSharp} from '@mui/icons-material'
import {DeleteSharp} from '@mui/icons-material'
import dayjs from 'dayjs';
import Cookies from 'js-cookie'

export default function TransList({trans,getTransactions,setEditTrans}) {
  const token = Cookies.get("token")
  const remove =async (id)=>{
    console.log(id)
    if(!window.confirm("Are you sure?")) return
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`bearer ${token}`
      }
    })
    if(res.ok){
      getTransactions()
      window.alert("deleted successfully")
    }
  }

  const formatDate = (date)=>{
   return dayjs(date).format("DD-MMM, YYYY")
  }

  return (<> 
   <Typography variant='h6' sx={{marginTop:10}} >Transactions</Typography>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trans.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center'>{row.amount}</TableCell>
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="center">{formatDate(row.date)}</TableCell>
              <TableCell align='center'>
                <IconButton color='primary' component="label" sx={{marginRight:1}} onClick={()=>setEditTrans(row)} >
                  <EditSharp/>
                </IconButton>
                <IconButton color='warning' component="label" onClick={()=>{remove(row._id);console.log(row._id)}}>
                  <DeleteSharp/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  
  );
}
