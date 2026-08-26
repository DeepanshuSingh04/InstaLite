import {useContext} from 'react';
import {AuthContext} from '../auth.context.jsx';
import {login, register, getMe} from '../services/auth.api.js'



export function useAuth() {
    
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading} = context


    const handleLogin = async (username, password) => {    // handle login function
        setLoading(true)
        try {
            const response = await login(username, password) // login api me request kri hain 
            setUser(response.user)
        }
        catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const handleRegister = async (username, email, password) => {

        setLoading(true)

        try {
            const response = await register(username, email, password)
            setUser(response.user)
        }
        catch(err) {
            console.log(err)

        } 
        finally {
            setLoading(false)
        }
    }
    
    return {
        user, loading, handleLogin, handleRegister
    }
}


// In short: useAuth() ek shortcut/custom hook hai jo AuthContext ka data kisi bhi component me 
// easily access karne deta hai.

// ab ye hook hamara kya kr rha hain state ko bhi manage kr rha hain or api layer ko bhi call krke response wala part manage kr rha hain 