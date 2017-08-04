/******************************************************************************
Submit Login Form
******************************************************************************/

function submitLoginForm() {
    var loginForm =  document.querySelector('form.login'),
        emailInput = document.querySelector('.login-field .username'),
        passwordInput =  document.querySelector('.login-field .password');

    var emailContent = emailInput.value,
        passwordContent = passwordInput.value;

    $.ajax({
        url: "/access/login",
        type: "POST",
        data: {
            email: emailContent,
            password: passwordContent
        }
    })
    .done(function(response) {
        console.log("User Data was successfully sent!");
        if(response.status == 'SUCCESS') { window.location = response.home; }
    })
    .fail(function(error) {
        console.log("Login data could not be sent!");
    });
}
