import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    
    const [token, setToken] = useState(null)
    const [loginSuccessMessage, setLoginSuccessMessage] = useState('')

   

    useEffect(() => {
        if(token) return

        const localToken = localStorage.getItem('accesstoken')

        if(localToken !== null) {
            setToken(localToken)
        }
    }, [])

    useEffect(() => {
        if(token) localStorage.setItem('accesstoken', token)
    }, [token])

    
    //register
    const register = async (formData) => {
        try {
            const res = await fetch('http://localhost:4000/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(formData)
            })
      
      
            console.log(res)
            const data = await res.json()
            console.log(data)
            
            
            if(res.status !== 201) {
              throw new Error(data)
              
            }
      
            // setToken(data.token)
            return { success: 'User created successfully' }
            
          } catch (error) {
            return {error: error.message }
          }
    }
    
    
    
    //Login

    const login = async (formData) => {
        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(formData)
            })
      
      
            console.log(res)
            const data = await res.json()
            console.log(data)
            
            
            if(res.status !== 200) {
              throw new Error(data)
              
            }
      
            setToken(data.token)
            return { success: 'User Logged In' }
            
          } catch (error) {
            return {error: error.message }
          }
    }
    

    //Logout
    const logout = () => {
        localStorage.removeItem('accesstoken')
        setToken(null)
    }


   // 
  

    const value = {
        token,
        register,
        login,
        logout,
        setToken,
        loginSuccessMessage, 
        setLoginSuccessMessage
       
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) throw new Error('useAuth must be inside an AuthContextProvider')

    return context
}