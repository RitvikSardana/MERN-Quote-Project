import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login  = () =>{
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const URL = "http://localhost:1337/api/login"

  const loginUser = async (event) =>{
    event.preventDefault()
    await fetch(URL,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    })
    .then((response)=> response.json())
    .then(data=>{
      if(data.user){
        localStorage.setItem('token',data.user)
        alert('Login Successful')
        navigate('/quote')
      }
      else{
        alert("please check your username or password")
      }
      console.log(data)
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser} >
        <br/>
        <input 
          value = {email}
          onChange = {e=>setEmail(e.target.value)}
          type="email" 
          placeholder = "Email" 
        />
        <br/>
        <input
          value = {password}
          onChange = {e=>setPassword(e.target.value)} 
          type="password" 
          placeholder = "password"   
        />
        <br/>
        <input type = "submit" value="Login" />
        
      </form>
    </div>
  )
}

export default Login;
