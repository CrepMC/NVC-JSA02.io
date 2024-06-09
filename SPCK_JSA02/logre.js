const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.querySelector('.container');

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve stored users data
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists and password matches
    const user = storedUsers.find(user => user.email === email && user.password === password);
    if (user) {
        alert('Login successful');
        // Save login status
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the main page after successful login
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Retrieve stored users data
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email is already registered
    const userExists = storedUsers.some(user => user.email === email);

    if (userExists) {
        alert('Email is already registered');
    } else {
        // Store new user data in Local Storage
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Registration successful');
        // Save login status
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the main page after successful registration
        window.location.href = 'index.html';
    }
});

// Check login status
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // If logged in, redirect to main page
        window.location.href = 'index.html';
    }
});
