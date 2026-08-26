import React from 'react'
import { RouterProvider} from 'react-router-dom'
import AppRoutes from './AppRoutes'
import "./shared/global.scss"
import { AuthProvider } from './features/auth/auth.context.jsx'


const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>  
  )
}

export default App
