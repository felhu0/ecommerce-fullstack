import { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { validateLogin } from '../../utils/validateLogin'
import { useAuth } from '../contexts/authContext'
import { Navbar } from '../components/Navbar'

export const Login = () => {
    

    const { login, loginSuccessMessage, setLoginSuccessMessage } = useAuth()

    const [formData, setFormData] = useState({
      
      email: '',
      password: ''
    })
    const [formErrors, setFormErrors] = useState('')
    


    const handleSubmit = async (e) => {
      e.preventDefault()

      if(!validateLogin(formData, setFormErrors)) return



      const { error, success } = await login(formData)

      if(error) {
        setFormErrors({ message: error})
      } else if(success) {
        setLoginSuccessMessage(success)
      
      }
      console.log(success)

    }

    
    const handleChange = (e) => {
      setFormData(data => {
        return {
          ...data,
          [e.target.name]: e.target.value
        }
      })
    }
    
    

    return (
      <>
        <Navbar />
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className='login-container'>

            <h2 className="login-title">Login</h2>

            <div className='login-form-email login-form-group'>
              <label htmlFor="email">Email</label>
              <input type="email" name='email' value={formData.email} onChange={handleChange} />
              { formErrors.email && <p className='error'>{formErrors.email}</p>}
            </div>

            <div className='login-form-password login-form-group'>
              <label htmlFor="name">Password</label>
              <input type="password" name='password' value={formData.password} onChange={handleChange} />
              { formErrors.password && <p className='error'>{formErrors.password}</p>}
              <p className='become-member'><Link to='/auth/register'>Become a member</Link></p>
            </div>
            
            { formErrors.message && <p className='error'>{formErrors.message}</p>} 
            {/* { success && <p className='success-message'>{success}</p>}  */}
            <div>
              <button className='submit-btn'>Login</button>
            </div>
            
          </div>
          

          
         </form>
      </>
      
    )
  }