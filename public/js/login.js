/*switching signIn/signUp forms Start*/
const toggleBtns = document.querySelectorAll('.side .btn');
const signIn = document.querySelector('.signin');
const signUp = document.querySelector('.signup');
const sides = document.querySelectorAll('.side');
const forms = document.querySelectorAll('.form');

toggleBtns.forEach(btn => {btn.addEventListener('click',toggle)});

function toggle(){
    signIn.classList.toggle('hidden');
    signUp.classList.toggle('hidden');
    sides.forEach(side => {side.classList.toggle('left')});
    forms.forEach(form => {form.classList.toggle('right')});
}
/*switching signIn/signUp forms End*/


/*Mobile Layout Animation Start*/
const mobileBtns = document.querySelectorAll('.btn.mobile-only');

mobileBtns.forEach(btn => {btn.addEventListener('click',mobileToggle)});

function mobileToggle(){
    signIn.classList.toggle('hidden');
    signUp.classList.toggle('hidden');
    signIn.classList.toggle('top');
}
/*Mobile Layout Animation End*/

/*SignUp form validation Start*/
const signUpForm = document.querySelector('.signup .form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

signUpForm.addEventListener('submit',checkValues);

function checkValues(e){

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let isError = false;

    if(usernameValue === ""){
        showError(username,'Username cannot be empty');
        isError = true;
    }
    else if(usernameValue.length < 10){
        showError(username,'Username should be at least 10 characters');
        isError = true;
    }
    else{
        success(username);
    }

    if(emailValue === ""){
        showError(email,'Email cannot be empty');
        isError = true;
    }
    else if(emailValue.indexOf('@') === -1 || emailValue.indexOf(".") === -1){
        showError(email,'Please enter a valid email');
        isError = true;
    }
    else{
        success(email);
    }

    if(passwordValue === ""){
        showError(password,'Password cannot be empty');
        isError = true;
    }
    else if(passwordValue.length < 10){
        showError(password,'Password should be at least 10 characters');
        isError = true;
    }
    else{
        success(password);
    }

    if(password2Value !== passwordValue){
        showError(password2,'Password does not match');
        isError = true;
    }
    else{
        success(password2);
    }

    if(isError){
        e.preventDefault();
    }
}

function showError(input,message){
    const formControl = input.parentElement;
    const error = formControl.querySelector('small');
    input.style.border = '2px solid red';
    error.innerText = message;
    error.style.visibility = 'visible';
}

function success(input){
    const formControl = input.parentElement;
    const error = formControl.querySelector('small');
    input.style.border = 'none';
    error.style.visibility = 'hidden';
}
/*SignUp form validation End*/

/*SignIn form validation Start*/
const signInForm = document.querySelector('.signin .form');
const loginEmail = document.querySelector('#loginEmail');
const loginPass = document.querySelector('#loginPass');
const showPass = document.querySelector('#showPass');

showPass.addEventListener('click',togglePass);
signInForm.addEventListener('submit',verifyLogin);

function togglePass(){
    if(showPass.checked === true){
        loginPass.setAttribute('type','text');
    }
    else{
        loginPass.setAttribute('type','password');
    }
}

function verifyLogin(e){
    e.preventDefault();

    const loginEmailValue = loginEmail.value.trim();
    const loginPassValue = loginPass.value.trim();
    flag = true;

    users.forEach((user) => {
        if(loginEmailValue === user.email && loginPassValue === user.password){
            alert("Login Successfull");
            flag = false;
        }
    });
    if(flag){
        alert("Login failed. Username or Password incorrect.");
    }
}
/*SignIn form validation End*/

/*JSON data import Start*/
let users;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        users = JSON.parse(xhttp.responseText).userlist;
        console.log(users);
    }
};
xhttp.open("GET", "./json/userinfo.json", true);
xhttp.send();
/*JSON data import End*/
