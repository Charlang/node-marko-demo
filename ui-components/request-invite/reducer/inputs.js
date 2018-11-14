'use strict';

const INIT = {
    status: 'INIT',
    name: '',
    email: '',
    confirmEmail: '',
    nameErr: false,
    emailErr: false,
    emailConfirmed: false,
    errorMsg: ''
};

module.exports = (state = INIT, action) => {
    let { status, name, email, confirmEmail, nameErr, emailErr, emailConfirmed, errorMsg } = state;
    switch (action.type) {
        case 'SET_NAME':
            name = action.value;
            nameErr = false;
            break;
        case 'SET_EMAIL':
            email = action.value;
            emailErr = false;
            emailConfirmed = confirmEmail ? email === confirmEmail : emailConfirmed;
            break;
        case 'CONFIRM_EMAIL':
            confirmEmail = action.value;
            emailConfirmed = action.value && action.value === email;
            emailErr = !emailConfirmed;
            break;
        case 'SUBMIT':
            nameErr = nameErr || !name;
            emailErr = emailErr || !email || email !== confirmEmail;
            break;
        case 'RESET':
            return INIT;
        case 'START':
        case 'SENDING':
        case 'SUCCESS':
            status = action.type;
            break;
        case 'ERR':
            errorMsg = action.value && action.value.replace(/data./g, '');
            nameErr = action.value && action.value.toLowerCase().indexOf('name') !== -1;
            emailErr = action.value && action.value.toLowerCase().indexOf('email') !== -1;
            break;
        default:
            return state;
    }
    errorMsg = nameErr || emailErr ? errorMsg : '';
    return { status, name, email, confirmEmail, nameErr, emailErr, emailConfirmed, errorMsg };
};
