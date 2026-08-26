import React, { useState } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const {handleLogin, loading, user} = useAuth()
    const navigate = useNavigate()

    if (loading) {           //agr user login kr rha hain or jo kuch time 1 sec ke liye pending state me rhta hain to screen pe loading show hoga
        return (
            <h1>Loading...</h1>
        )
    }
    
    async function handleSubmit(e) {
        e.preventDefault()

        await handleLogin(username, password)       //context api banane ke badd ka part hain ye 
        .then(res=> {
            console.log("user Loggedin")
            navigate("/")               // ek bar user login hojaye to use ham navigate krwa denge
        })
    
        // axios.post("http://localhost:3000/api/auth/login", {
        //     username,
        //     password,
        // }, {
        //     withCredentials:true
        // })
        // .then(res => {
        //     console.log(res.data)
        // })
        
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
                <button className='button primary-button'>Login</button>
            </form>

            <p>Already have an account? <Link to="/register" className='toggleAuthForm'>Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
