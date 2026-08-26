import React, { useState } from 'react'
import '../styles/form.scss'
import { Link } from 'react-router-dom'
import  axios  from "axios"


const Register = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        //yha ka backend api se connect krne ka kaam sara logic ham auth.api.js me likhenge (same for login)
    }


  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input onInput={(e) => { setusername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='Enter Username'/>
                <input onInput={(e) => { setemail(e.target.value)}}
                type="text" 
                name='email' 
                placeholder='Enter email' />
                <input onInput={(e) => { setpassword(e.target.value)}}
                type="password" 
                name='password' 
                placeholder='Enter Password' />
                <button>Register</button>
            </form>

            <p>Already have an account? <Link to="/login" className='toggleAuthForm'>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
