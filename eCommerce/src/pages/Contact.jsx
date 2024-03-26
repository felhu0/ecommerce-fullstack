import { useState } from 'react'
import './Contact.css'
import { validateContact } from '../../utils/validateContact'
import axios from 'axios'
import { Navbar } from '../components/Navbar'


export const Contact = () => {
  
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [dataMessage, setDataMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!validateContact(formData, setFormErrors)) return
    
    try {
      const res = await axios.post('http://localhost:4000/api/messages', formData);
      if(res.status === 200) {
        setDataMessage(res.data.message);
        console.log(res.status)
        console.log(res.data.message)
        setFormData({
          name: '',
          email: '',
          message: ''
        })
      } else {
        setDataMessage('Something went wrong')
      }
    } catch (error) {
      console.error(error)
    }
    
   

    console.log(formData)
  }

  const handleChange = (e) => {
    setFormData(data => ({    
        ...data,
        [e.target.name]: e.target.value  
    }))
    // Rensa dataMessage när formuläret ändras
    if(dataMessage) setDataMessage('');
  }

  //hantera klick på formuläret
  const handleFormClick = () => {
    if(dataMessage) setDataMessage('');
  }

    return (
      <>
        <Navbar />
        <form onSubmit={handleSubmit} className="contact-form" noValidate onClick={handleFormClick}>
        
        <div className='contact-container'>
          {dataMessage && <p className="data-message">{dataMessage}</p>}
          <h2 className="contact-title">Contact us</h2>

        
            <div className='form-name contact-form-group'>
              <label htmlFor="name">Name</label>
              <input type="text" name='name' value={formData.name} onChange={handleChange}/>
              { formErrors.name && <p className='error'> {formErrors.name} </p>}
            </div>

    
    
          
          <div className='contact-form-email contact-form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} />
            { formErrors.email && <p className='error'> {formErrors.email} </p>}
          </div>
          
          <div className='contact-form-message contact-form-group'>
            <label htmlFor="message">Message</label>
            <textarea name="message" value={formData.message} placeholder='Write something' onChange={handleChange}></textarea>
            { formErrors.message && <p className='error'> {formErrors.message} </p>}
          </div>
         
          <div>
            <button className='contact-submit-btn'>Submit</button>
          </div>

        </div>
        
        </form>

        
      </>
      
      
    )
  }