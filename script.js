const signupBtn = document.getElementById("signup-btn")
const signupSec = document.getElementById("signupSec")
const signupContent = document.getElementById("signupContent")
const signupInfo = document.getElementById("signup-info")
const profile = document.getElementById("profile")

const input = document.querySelectorAll(".signup-content input")
const name = input[0]
const email = input[1]
const password = input[2]
const confirmPassword = input[3]

function redirectToProfile() {
    window.location.href = './profile.html';
}

function isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.loggedIn && user.accessToken;
}
if(isLoggedIn()){
    redirectToProfile()
}

function funcSignupInfo(id, info) {
    signupInfo.innerHTML =
        `<div id="${id}">${info}</div> `
}

function funcConfirmPassord(pass, confirmPass) {
    if (pass === confirmPass) {
        return true
    }
    return false
}

function validatePassword(pass) {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (pass.match(lowerCaseLetters)) {
        if (pass.match(upperCaseLetters)) {
            if (pass.match(numbers)) {
                if (pass.length >= 8) {
                    return "valid"
                } else {
                    return "Password must contain atleast 8 or more characters"
                }
            } else {
                return "Password must contain atleast one number"
            }
        } else {
            return "Password must contain atleast one uppercase letter"
        }
    } else {
        return "Password must contain atleast one lowercase letter"
    }
}

function validateMail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return true;
    }
    return false;
}

signupBtn.addEventListener("click", () => {
    if (name.value && email.value && password.value && confirmPassword.value) {
        if (validateMail(email.value)) {
            let passwordCheck = validatePassword(password.value)
            if (passwordCheck === "valid") {
                if (funcConfirmPassord(password.value, confirmPassword.value)) {
                    funcSignupInfo('success', "Successfully Signed Up!")
                    let obj = JSON.parse(localStorage.getItem('user'))
                    obj.loggedIn = true
                    obj.name = name.value
                    obj.email = email.value
                    obj.password = password.value
                    localStorage.setItem('user', JSON.stringify(obj))
                    setTimeout(() => {
                        name.value = ""
                        email.value = ""
                        password.value = ""
                        redirectToProfile()
                    }, 1000)
                }
                else {
                    funcSignupInfo('error', "Password dosen't match")
                }
            }
            else {
                funcSignupInfo('error', passwordCheck)
            }
        }
        else {
            funcSignupInfo('error', "Enter valid email address.")
        }
    }
    else {
        funcSignupInfo('error', "All the fields are mandotary.")
    }
})

profile.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user.loggedIn){
        alert("Sign up first!")
    }
})