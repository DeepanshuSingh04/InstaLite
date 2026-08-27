import React, { useState } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const Register = () => {

    const { loading, handleRegister } = useAuth()

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        await handleRegister(username, email, password)
        navigate('/')

    }

    if(loading) {
        return (<main><h1>Loading....</h1></main>)
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
                <button className='buttom primary-button'>Register</button>
            </form>

            <p>Already have an account? <Link to="/login" className='toggleAuthForm'>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
