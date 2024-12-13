document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('registration-form');
    var userName = document.getElementById('username');
    var email = document.getElementById('email');

    form.addEventListener('submit', function(event) {
        console.log('Form submitted');
        event.preventDefault();
        alert(`You are registered! Username: ${userName.value}, Email: ${email.value}`);
    });
});