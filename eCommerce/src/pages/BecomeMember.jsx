
import { useState } from 'react'
import './BecomeMember.css'
import { validateRegister } from '../../utils/validateRegister'
import { useAuth } from '../contexts/authContext'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const BecomeMember = () => {
    
  const { register } = useAuth()
    const [formData, setFormData] = useState({
      
      email: '',
      password: '',
      confirmPassword: ''
    })
    const [formErrors, setFormErrors] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()
      
      if(!validateRegister(formData, setFormErrors)) return
    

      const { error, success } = await register(formData)

      if(error) {
        setFormErrors({ message: error})
      }
      if(success) {
        setSuccess(success)
        setFormData({
          email: '',
          password: '',
          confirmPassword: ''
        })
      }

      console.log(formData)
    }

    const handleChange = (e) => {
      setFormData(data => ({
      
          ...data,
          [e.target.name]: e.target.value
       
      }))
      // Rensa success-message när formuläret ändras
      if(success) setSuccess('');
    }
    
    //hantera klick på formuläret
    const handleFormClick = () => {
      if(success) setSuccess('');
    }

    return (
      <> 
        <Navbar />
        <form onSubmit={handleSubmit} className="become-member-form" noValidate onClick={handleFormClick}>

        <div className='become-member-container'>
          <h2 className="become-member-title">Become a member</h2>

          <p className='become-member-text'>Please register your new accout</p>
          
          <div className='register-form-email register-form-group'>
            <label htmlFor="email">Email</label>
            <input type="text" name='email' value={formData.email} onChange={handleChange} />
            { formErrors.email && <p className='error'>{formErrors.email}</p>}
          </div>


            <div className='register-password register-form-group'>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' value={formData.password} onChange={handleChange} />
              { formErrors.password && <p className='error'>{formErrors.password}</p>}
            </div>

            <div className='register-confirm-password register-form-group'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}/>
              { formErrors.confirmPassword && <p className='error'>{formErrors.confirmPassword}</p>}
              <p className='login-here'><Link to='/auth/login'>Login here</Link></p>
            </div>
        
        
          
            { formErrors.message && <p className='error'>{formErrors.message}</p>} 
            { success && <p className='success-message'>{success}</p>} 
            <div>
              <button className='submit-btn'>Register</button>
            </div>

        </div>

        </form>
      </>
      
    )
  }