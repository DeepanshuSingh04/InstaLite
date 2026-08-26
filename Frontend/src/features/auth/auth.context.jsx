import {createContext, useState, useEffect} from 'react';
import {login, register, getMe} from './services/auth.api'


export const AuthContext = createContext()  // Ye basically ek global authentication container create kar raha hai.


export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null)       //user initially null means abhi koi logged in nhi hain 
    const [loading, setLoading] = useState(false)   // loading false initially means abhi koi api request nhi chal rhi


    
    return (
        <AuthContext.Provider value={{user, loading, setUser, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}