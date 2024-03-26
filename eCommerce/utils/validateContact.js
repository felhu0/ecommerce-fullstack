const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validateContact = (formData, setFormErrors) => {
     

    const err = {}

    //First Name 
    if(formData.name.trim() === '') {
        err.name = 'Your need to enter a name'
    } else if(formData.name.length < 2) {
        err.name = 'Your name must be atleast 2 chars long'
    }

    
    //Email
    if(formData.email.trim() === '') {
      err.email = 'You need to enter an email address'
    } else if(!emailRegex.test(formData.email)) {
      err.email = 'You need to enter a valid email address'
    }

    //Message 
    if(formData.message.trim() === '') {
        err.message = 'This field cannot be empty'
    }

    setFormErrors(err);

     // Returnera false om det finns några fel
    return Object.keys(err).length === 0;
}