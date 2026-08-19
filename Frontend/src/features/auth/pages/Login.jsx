import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    
    async function handleSubmit(e) {
        e.preventDefault()
    
        axios.post("http://localhost:3000/api/auth/login", {
            username,
            password,
        }, {
            withCredentials:true
        })
        .then(res => {
            console.log(res.data)
        })
    }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input onInput={(e) => { setusername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='Enter Username'/>
                <input onInput={(e) => { setpassword(e.target.value)}}
                type="password" 
                name='password' 
                placeholder='Enter Password' />
                <button>Login</button>
            </form>

            <p>Already have an account? <Link to="/register" className='toggleAuthForm'>Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
