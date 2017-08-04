// TODO: Handle matching changes when org field changes but not confirm field
// TODO: Validate non-account related fields
// TODO: Validate all fields before submitting form

$('.details-form').submit(function(event){
    submitRegistrationForm();
    $('.submit input').attr('disabled', 'disabled');
    event.preventDefault();
    return false;
});


/******************************************************************************
Base Validation Controller
******************************************************************************/
(function baseValidation() {
    var firstname = document.getElementsByName('first-name')[0],
        lastname = document.getElementsByName('last-name')[0],
        phone = document.getElementsByName('phone')[0],
        birthday = document.getElementsByName('birthday')[0],
        location = document.getElementsByName('location')[0],
        make = document.getElementsByName('make')[0],
        model = document.getElementsByName('model')[0],
        insurance = document.getElementsByName('insurance')[0];

    firstname.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (firstname.value.length > 0) { firstname.classList.add('valid'); firstname.classList.remove('invalid'); }
        else { firstname.classList.remove('valid'); firstname.classList.add('invalid');}
    });

    firstname.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (firstname.value.length > 0) { firstname.classList.add('valid'); firstname.classList.remove('invalid'); }
        else { firstname.classList.remove('valid'); firstname.classList.add('invalid');}
    });

    lastname.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (lastname.value.length > 0) { lastname.classList.add('valid'); lastname.classList.remove('invalid'); }
        else { lastname.classList.remove('valid'); lastname.classList.add('invalid');}
    });

    lastname.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (lastname.value.length > 0) { lastname.classList.add('valid'); lastname.classList.remove('invalid'); }
        else { lastname.classList.remove('valid'); lastname.classList.add('invalid');}
    });

    phone.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (phone.value.length > 0) { phone.classList.add('valid'); phone.classList.remove('invalid'); }
        else { phone.classList.remove('valid'); phone.classList.add('invalid');}
    });

    phone.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (phone.value.length > 0) { phone.classList.add('valid'); phone.classList.remove('invalid'); }
        else { phone.classList.remove('valid'); phone.classList.add('invalid');}
    });

    birthday.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (birthday.value.length > 0) { birthday.classList.add('valid'); birthday.classList.remove('invalid'); }
        else { birthday.classList.remove('valid'); birthday.classList.add('invalid');}
    });

    birthday.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (birthday.value.length > 0) { birthday.classList.add('valid'); birthday.classList.remove('invalid'); }
        else { birthday.classList.remove('valid'); birthday.classList.add('invalid');}
    });

    location.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (location.value.length > 0) { location.classList.add('valid'); location.classList.remove('invalid'); }
        else { location.classList.remove('valid'); location.classList.add('invalid');}
    });

    location.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (location.value.length > 0) { location.classList.add('valid'); location.classList.remove('invalid'); }
        else { location.classList.remove('valid'); location.classList.add('invalid');}
    });

    make.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (make.value.length > 0) { make.classList.add('valid'); make.classList.remove('invalid'); }
        else { make.classList.remove('valid'); make.classList.add('invalid');}
    });

    make.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (make.value.length > 0) { make.classList.add('valid'); make.classList.remove('invalid'); }
        else { make.classList.remove('valid'); make.classList.add('invalid');}
    });

    model.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (model.value.length > 0) { model.classList.add('valid'); model.classList.remove('invalid'); }
        else { model.classList.remove('valid'); model.classList.add('invalid');}
    });

    model.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (model.value.length > 0) { model.classList.add('valid'); model.classList.remove('invalid'); }
        else { model.classList.remove('valid'); model.classList.add('invalid');}
    });

    insurance.addEventListener('keyup', function(event) {
        event.stopPropagation();
        if (insurance.value.length > 0) { insurance.classList.add('valid'); insurance.classList.remove('invalid'); }
        else { insurance.classList.remove('valid'); insurance.classList.add('invalid');}
    });

    insurance.addEventListener('focusout', function(event) {
        event.stopPropagation();
        if (insurance.value.length > 0) { insurance.classList.add('valid'); insurance.classList.remove('invalid'); }
        else { insurance.classList.remove('valid'); insurance.classList.add('invalid');}
    });



})();

/******************************************************************************
Email Validation Controller
******************************************************************************/

(function emailVisualValidation() {
    var flags = {
        codes: [],
        email: {
            valid: {
                status: false,
                prior: false,
                tripped: false,
            },
            match: {
                status: false,
                prior: false,
                tripped: false,
            }
        }
    }

    var email = document.getElementsByName('email')[0],
        vmail = document.getElementsByName('confirm-email')[0];

    email.addEventListener('keyup', function(event) {
        event.stopPropagation();
        validateEmail(email.value, vmail.value, flags);
        if (flags.codes.length == 0) { email.classList.add('valid'); email.classList.remove('invalid'); }
        else if ((email.value.length > 0) && !(flags.codes.length == 0)) { email.classList.remove('valid'); email.classList.add('invalid'); }
        else { email.classList.remove('valid'); email.classList.remove('invalid');}
    });

    email.addEventListener('focusout', function(event) {
        event.stopPropagation();
        validateEmail(email.value, vmail.value, flags);
        if (flags.codes.length == 0) { email.classList.add('valid'); email.classList.remove('invalid'); }
        else if ((email.value.length > 0) && !(flags.codes.length == 0)) { email.classList.remove('valid'); email.classList.add('invalid'); }
        else { email.classList.remove('valid'); email.classList.remove('invalid');}
    });

    vmail.addEventListener('keyup', function(event) {
        event.stopPropagation();
        matchingEmailCheck(email.value, vmail.value, flags);
        if (flags.codes.length == 0) { vmail.classList.add('valid'); vmail.classList.remove('invalid'); }
        else if ((vmail.value.length > 0) && !(flags.codes.length == 0)) { vmail.classList.remove('valid'); vmail.classList.add('invalid'); }
        else {vmail.classList.remove('valid'); vmail.classList.remove('invalid');}
    });

    vmail.addEventListener('focusout', function(event) {
        event.stopPropagation();
        matchingEmailCheck(email.value, vmail.value, flags);
        if (flags.codes.length == 0) {vmail.classList.add('valid'); vmail.classList.remove('invalid'); }
        else if ((vmail.value.length > 0) && !(flags.codes.length == 0)) { vmail.classList.remove('valid'); vmail.classList.add('invalid'); }
        else { vmail.classList.remove('valid'); vmail.classList.remove('invalid');}
    });

})();

/******************************************************************************
Email Validator
******************************************************************************/

function validateEmail(email, vmail, flags, callback) {
    var validNote = document.querySelector('.email-note.real');

    if((/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email)) {
        notifyEmailValidity(validNote, true, flags, 'valid', 'E1');
    } else {
        notifyEmailValidity(validNote, false, flags, 'valid', 'E1');
    }

    if(vmail.length > 0) {
        matchingEmailCheck(email, vmail, flags);
    }

    typeof callback == 'function' && callback();

}

/******************************************************************************
Matching Email Check
******************************************************************************/

function matchingEmailCheck(password, vassword, flags) {
    var matchNote = document.querySelector('.email-note.match');

    if(password == vassword) {
        notifyEmailValidity(matchNote, true, flags, 'match', 'V1');
    } else {
        notifyEmailValidity(matchNote, false, flags, 'match', 'V1');
    }

}

/******************************************************************************
Password Error Notification
******************************************************************************/

function notifyEmailValidity(note, clear, flags, sender, code){

    if(!clear) {

        if (!includesCode(flags, code)) {
            flags['codes'].push(code);
            flags['email'][sender]['status'] = true;
            flags['email'][sender]['tripped'] = true;
        }


    } else {

        if (includesCode(flags, code)) {
            clearCode(flags, code);
            flags['email'][sender]['prior'] = flags['email'][sender]['status'];
            flags['email'][sender]['status'] = false;
        }

    }

    flags['email'][sender]['prior'] = flags['email'][sender]['status'];

    if (!flags['email'][sender]['status']) {
        note.classList.remove('need');
        note.classList.add('has');
    } else {
        note.classList.remove('has');
        note.classList.add('need');
    }

    if(flags.codes.length == 0 && flags.email.match.tripped) {
        document.querySelector('.submit input').classList.add('clear');
    } else {
        document.querySelector('.submit input').classList.remove('clear');
    }

}


/******************************************************************************
Password Validation Controller
******************************************************************************/

(function passwordVisualValidation() {
    var flags = {
        codes: [],
        password: {
            short: {
                status: false,
                prior: false,
                tripped: false,
            },
            uppercase: {
                status: false,
                prior: false,
                tripped: false,
            },
            number: {
                status: false,
                prior: false,
                tripped: false,
            },
            special: {
                status: false,
                prior: false,
                tripped: false,
            },
            match: {
                status: false,
                prior: false,
                tripped: false,
            }
        }
    }

    var password = document.getElementsByName('password')[0],
        vassword = document.getElementsByName('confirm-password')[0];

    password.addEventListener('keyup', function(event) {
        event.stopPropagation();
        validatePassword(password.value, vassword.value, flags);
        if (flags.codes.length == 0) { password.classList.add('valid'); password.classList.remove('invalid'); }
        else if ((password.value.length > 0) && !(flags.codes.length == 0)) { password.classList.remove('valid'); password.classList.add('invalid'); }
        else { password.classList.remove('valid'); password.classList.remove('invalid');}
    });

    password.addEventListener('focusout', function(event) {
        event.stopPropagation();
        validatePassword(password.value, vassword.value, flags);
        if (flags.codes.length == 0) { password.classList.add('valid'); password.classList.remove('invalid'); }
        else if ((password.value.length > 0) && !(flags.codes.length == 0)) { password.classList.remove('valid'); password.classList.add('invalid'); }
        else { password.classList.remove('valid'); password.classList.remove('invalid');}
    });

    vassword.addEventListener('keyup', function(event) {
        event.stopPropagation();
        matchingPasswordCheck(password.value, vassword.value, flags);
        if (flags.codes.length == 0) { vassword.classList.add('valid'); vassword.classList.remove('invalid'); }
        else if ((vassword.value.length > 0) && !(flags.codes.length == 0)) { vassword.classList.remove('valid'); vassword.classList.add('invalid'); }
        else { vassword.classList.remove('valid'); vassword.classList.remove('invalid'); }
    });

    vassword.addEventListener('focusout', function(event) {
        event.stopPropagation();
        matchingPasswordCheck(password.value, vassword.value, flags);
        if (flags.codes.length == 0) { vassword.classList.add('valid'); vassword.classList.remove('invalid'); }
        else if ((vassword.value.length > 0) && !(flags.codes.length == 0)) { vassword.classList.remove('valid'); vassword.classList.add('invalid'); }
        else { vassword.classList.remove('valid'); vassword.classList.remove('invalid');}
    });



})();


/******************************************************************************
Password Validator
******************************************************************************/

function validatePassword(password, vassword, flags, callback) {
    var lengthNote = document.querySelector('.password-note.length'),
        uppercaseNote = document.querySelector('.password-note.uppercase'),
        numberNote = document.querySelector('.password-note.number'),
        specialNote = document.querySelector('.password-note.special');

    if(password.length > 8) {
        notifyPasswordValidity(lengthNote, true, flags, 'short', 'P1');
    } else {
        notifyPasswordValidity(lengthNote, false, flags, 'short', 'P1');
    }

    if(/[A-Z]/.test(password)) {
        notifyPasswordValidity(uppercaseNote, true, flags, 'uppercase', 'P2');
    } else {
        notifyPasswordValidity(uppercaseNote, false, flags, 'uppercase', 'P2');
    }

    if(/[0-9]/.test(password)) {
        notifyPasswordValidity(numberNote, true, flags, 'number', 'P3');
    } else {
        notifyPasswordValidity(numberNote, false, flags, 'number', 'P3');
    }

    if(!(/^[a-zA-Z0-9- ]*$/.test(password))) {
        notifyPasswordValidity(specialNote, true, flags, 'special', 'P4');
    } else {
        notifyPasswordValidity(specialNote, false, flags, 'special', 'P4');
    }

    if(vassword.length > 0) {
        matchingPasswordCheck(password, vassword, flags);
    }

    typeof callback == 'function' && callback();

}


/******************************************************************************
Matching Password Check
******************************************************************************/

function matchingPasswordCheck(password, vassword, flags) {
    var matchNote = document.querySelector('.password-note.match');

    if(password == vassword) {
        notifyPasswordValidity(matchNote, true, flags, 'match', 'V1');
    } else {
        notifyPasswordValidity(matchNote, false, flags, 'match', 'V1');
    }

}


/******************************************************************************
Password Error Notification
******************************************************************************/

function notifyPasswordValidity(note, clear, flags, sender, code){

    if(!clear) {

        if (!includesCode(flags, code)) {
            flags['codes'].push(code);
            flags['password'][sender]['status'] = true;
            flags['password'][sender]['tripped'] = true;
        }


    } else {

        if (includesCode(flags, code)) {
            clearCode(flags, code);
            flags['password'][sender]['prior'] = flags['password'][sender]['status'];
            flags['password'][sender]['status'] = false;
        }

    }

    flags['password'][sender]['prior'] = flags['password'][sender]['status'];

    if (!flags['password'][sender]['status']) {
        note.classList.remove('need');
        note.classList.add('has');
    } else {
        note.classList.remove('has');
        note.classList.add('need');
    }

    if(flags.codes.length == 0 && flags.password.match.tripped) {
        document.querySelector('.submit input').classList.add('clear');
    } else {
        document.querySelector('.submit input').classList.remove('clear');
    }

}


/******************************************************************************
Submit Registration Form
******************************************************************************/

function submitRegistrationForm() {
    var firstname = document.getElementsByName('first-name')[0].value,
        lastname = document.getElementsByName('last-name')[0].value,
        phone = document.getElementsByName('phone')[0].value,
        birthday = document.getElementsByName('birthday')[0].value,
        location = document.getElementsByName('location')[0].value,
        make = document.getElementsByName('make')[0].value,
        model = document.getElementsByName('model')[0].value,
        insurance = document.getElementsByName('insurance')[0].value,
        email = document.getElementsByName('email')[0].value,
        vmail = document.getElementsByName('confirm-email')[0].value,
        password = document.getElementsByName('password')[0].value,
        vassword = document.getElementsByName('confirm-password')[0].value;

    document.querySelector('.submit input').classList.add('submitted');


    $.ajax({
        url: './registration/register',
        type: 'POST',
        dataType: 'JSON',
        data: {
            firstname: firstname,
            lastname: lastname,
            birthday: birthday,
            phone: phone,
            location: location,
            make: make,
            model: model,
            insurance: insurance,
            email: email,
            password: password
        }
    })
    .done(function(response) {
        console.log("success: ", response);
        displayRegistrationResponse(response.msg, 'success', 'success');

        setTimeout(function() { window.location = '../access'; }, 2500);

    })
    .fail(function(error) {
        console.log("error: ", error);
        errorResponse = JSON.parse(error.responseText);

        displayRegistrationResponse(errorResponse.msg, 'failed', 'invalid');
    });

}


/******************************************************************************
Display the Registration Response
******************************************************************************/

function displayRegistrationResponse(message, status, type) {

    setTimeout(function() {
        document.querySelector('.submit input').classList.remove('submitted');
        document.querySelector('.submit input').classList.add(status);
        document.querySelector('.submit input').value = status;
    }, 500, status);

}


/******************************************************************************
Codes Remove
******************************************************************************/

function clearCode(flags, code) {

    while ((del = flags.codes.indexOf(code)) !== -1) {
        flags.codes.splice(del, 1);
    }

};


/******************************************************************************
Codes Includes
******************************************************************************/

function includesCode(flags, code) {

    if (flags.codes.indexOf(code) >= 0) {
        return true;
    } else {
        return false;
    }

};
