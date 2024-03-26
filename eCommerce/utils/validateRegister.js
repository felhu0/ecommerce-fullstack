const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validateRegister = (formData, setFormErrors) => {
    
        
        const err = {}

       
        //Email
        if(formData.email.trim() === '') {
          err.email = 'You need to enter a email address'
        } else if(!emailRegex.test(formData.email)) {
          err.email = 'You need to enter a valid email address'
        }
        
        //Password
        if(formData.password.trim() === '') {
          err.password = 'You need to enter a password'
        } else if(formData.password.length < 8) {
          err.password = 'Your password needs to be atleast 8 characters long'
        } 

        // Confirm Password 
        if(formData.password !== formData.confirmPassword) {
            err.confirmPassword = 'The passwords do not match'
        }
        setFormErrors(err);
        
        // Returnera false om det finns några fel
        return Object.keys(err).length === 0;
        
    
}