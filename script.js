console.log("Form Validation by JavaScript");
const nameerror = document.getElementById('name-error')
const phoneerror = document.getElementById('phone-error')
const emailerror = document.getElementById('email-error')
const messageerror = document.getElementById('message-error')
const submiterror = document.getElementById('submit-error')



function validateName() {
    let name = document.getElementById('contact-name').value;
    console.log(name);
    if(name.length == 0){
        nameerror.innerHTML = 'Name Is Required'
        return false;
    }
if(!name.match(/^[A-Za-z]+\s[A-Za-z]+$/)){
    nameerror.innerHTML = 'Write Full Name'
    return false;
}
    nameerror.innerHTML = '<i class="fa-solid fa-circle-check"></i> '
    return true;
}
function validatePhone() {
    let phone = document.getElementById('phone').value;
    if(phone.length == 0){
        phoneerror.innerHTML = 'Phone No is Required'
        return false;
    }
    if(phone.length !== 11){
        phoneerror.innerHTML = 'Phone No should be 11 digits'
        return false;
    }
    if(!phone.match(/^[0-9]{11}$/)){
        phoneerror.innerHTML = 'Phone No is Invalid'
        return false;
    }
    phoneerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    return true;  
}

function validateEmail() {
    let email = document.getElementById('email').value;
    if(email.length == 0){
        emailerror.innerHTML = 'Email is Required'
        return false;
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        emailerror.innerHTML = 'Email is Invalid'
        return false;
    }
    emailerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    return true;
}
function validateMessage() {
    let message = document.getElementById('message').value;
    let required = 30;
    let left = required - message.length;
    if(left > 0){
        messageerror.innerHTML = left + ' more characters required'
        return false;
    }   
    messageerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    return true;
}

const form = document.getElementById('form');
const result = document.getElementById('result');

function validateForm() {
  return (
    validateName() &&
    validatePhone() &&
    validateEmail() &&
    validateMessage()
  );
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (!validateForm()) return;

  const formData = new FormData(form);

  result.style.display = "block";
  result.innerHTML = "Please wait...";

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      result.innerHTML = "Form Submitted Successfully ✅";
    } else {
      result.innerHTML = data.message;
    }
  })
  .catch((err) => {
    console.log(err);
    result.innerHTML = "Something went wrong!";
  });
});