import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Quote = () => {

    const navigate = useNavigate();
    const URL = 'http://localhost:1337/api/quote'

    const [quote,setQuote] = useState('')
    const [newQuote,setNewQuote] = useState('')

    //To get user data
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwtDecode(token)
            console.log(user)
            if(!user) {
                localStorage.removeItem('token')
                navigate('/login')
            }
            else {
                populateQuote()
            }
        }

    },[])

    //function to populate our Frontend based on the user
    const populateQuote = async () =>{
        const req = await fetch (URL,{
            // method:'GET',
            headers:{
                'x-access-token':localStorage.getItem('token')
            },
        })
        const data = await req.json()
        console.log("data",data)
        if(data.status === 'ok'){
            //to show quote on the UI
            setQuote(data.quote)
        }
        else{
            alert(data.error)
        }
    }

    //Function to post new quote
    const newQuoteHandler = async (event) =>  {
        event.preventDefault()
        const req = await fetch(URL,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'x-access-token': localStorage.getItem('token') // use session storage
          },
          body:JSON.stringify({
              quote:newQuote
          })
        })
        const data = await req.json()
        if(data.status === 'ok'){
            setNewQuote('')
            setQuote(newQuote)
        }
        else{
            alert(data.error)
        }
    }

  return (
    <div>
        <h1>Your Quote : {quote|| 'No quote found'}</h1>
        <form onSubmit={newQuoteHandler}>
            <input type = "text" placeholder='Quote' value={newQuote} onChange = {e=>setNewQuote(e.target.value)} />
            <input type = "submit" value="Add Quote" />
        </form>
    </div>
  )
}

export default Quote