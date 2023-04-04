const valid = ({fullname, username, email, password, cf_password}) => {
    const error = {}

    if(!fullname) {
        error.fullname = 'Please fill your fullname'
    }
    else if (fullname.length > 25) {
        error.fullname = 'Fullname is up to 25 characters'
    }

    if(!username) {
        error.username = 'Please fill your username'
    }
    else if (username.toLowerCase().replace(/ /g, '').length > 25) {
        error.fullname = 'Fullname is up to 25 characters'
    }

    if(!email) {
        error.email = 'Please fill your email or mobile'
    }
    else if(!validateEmail(email)){
        error.email = "Email or mobile format is incorrect"
    }

    if(!password) {
        error.password = 'Please fill your password'
    }
    else if (password.length < 6) {
        error.password = 'Password must be at least 6 characters'
    }

    if(password !== cf_password)
        error.cf_password = 'Confirm password did not match'
    
    return {
        errorMessage: error,
        errorLength: Object.keys(error).length
    }
}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



export default valid