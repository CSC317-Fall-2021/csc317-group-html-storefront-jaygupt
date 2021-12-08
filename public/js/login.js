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

/*Show password functionality Start*/
const loginPass = document.querySelector('#loginPass');
const showPass = document.querySelector('#showPass');

showPass.addEventListener('click',togglePass);

function togglePass(){
    if(showPass.checked === true){
        loginPass.setAttribute('type','text');
    }
    else{
        loginPass.setAttribute('type','password');
    }
}
/*Show password functionality End*/

/* Hash Events Start */
if(window.location.hash === '#incorrectPass'){
    alert("Incorrect Password");
    window.location.hash = '';
}
if(window.location.hash === '#notFound'){
    alert("User not found");
    window.location.hash = '';
}
if(window.location.hash === '#accountCreated'){
    alert("Account Created Successfully");
    window.location.hash = '';
}
if(window.location.hash === '#emailExists'){
    alert("Email already exists");
    toggle();
    window.location.hash = '';
}
if(window.location.hash === '#usernameExists'){
    alert("Username already exists");
    toggle();
    window.location.hash = '';
}
/* Hash Events End */