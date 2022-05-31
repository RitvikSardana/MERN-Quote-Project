import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const URL = "http://localhost:1337/api/register"

  const registerUser = async (event) => {
    event.preventDefault()
    await fetch(URL,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })
    .then((response)=>response.json())
    .then(data=>{
      console.log(data)
      if(data.status === 'ok'){
        navigate('/login')
      }

    })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser} >
        <input 
          value = {name}
          onChange = {(e)=>setName(e.target.value)}
          type="text" 
          placeholder = "Name" 
        />
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
        <input type = "submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
