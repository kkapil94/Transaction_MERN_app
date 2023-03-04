import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Cookies from 'js-cookie';

export default function TransactionForm({getTransactions,editTrans,setEditTrans}) {
  const token = Cookies.get("token")
    const initialForm = {
        amount:0,
        desc:"",
        date:new Date()
      }
      const [form,setForm] = React.useState(initialForm)
      const handleSubmit = async (e)=>{
        e.preventDefault()
          const res = await editTrans.amount===undefined?create():update()
        if(res){
          getTransactions();
          setForm(initialForm)
        }
      }

      async function create(){
        const res = await fetch(`${process.env.REACT_API_URL}/transactions`,{
            method:"POST",
            body:JSON.stringify(form),
            headers:{
              "content-type":"application/json",
              Authorization : `bearer ${token}`
            }
          })
          getTransactions()
          return res
        }
        
        async function update(){
          const res = await fetch(`${process.env.REACT_API_URL}/transactions/${editTrans._id}`,{
            method:"PATCH",
            body:JSON.stringify(form),
            headers:{
              "content-type":"application/json",
              Authorization:`bearer ${token}`
            }
          })
          
          setEditTrans({})
          return res
      }

      const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
      }
      
      const handleDate = (newValue)=>{
        setForm({...form,date:newValue})
      }

      React.useEffect(()=>{
      if(editTrans!=={}){
        setForm(editTrans)
      }
      },[editTrans])

  return (<>
    <Card sx={{ minWidth: 275,marginTop:10 }}>
      <CardContent>
        <form onSubmit={handleSubmit} >
        <Typography variant="h6" >
            New transaction
        </Typography>
        <TextField id="outlined-basic" label="amount" variant="outlined" sx={{marginRight:5}} size="small" name="amount" value={form.amount} onChange={handleChange}/>
        <TextField id="outlined-basic" label="description" variant="outlined" sx={{marginRight:5}} size="small" name="desc" value={form.desc} onChange={handleChange}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DesktopDatePicker
         label="Transaction date"
         inputFormat="MM/DD/YYYY"
         value={form.date}
         onChange={handleDate}
         renderInput={(params) => <TextField {...params} sx={{marginRight:5}} size="small" />}
        />
        </LocalizationProvider>
        {
          editTrans.amount===undefined?(
        <Button type="submit" variant="contained">Submit</Button>
          ):(<Button type="submit" variant="contained">Update</Button>)
        }
        </form>
      </CardContent>
    </Card>
   
    </>
  );
}
