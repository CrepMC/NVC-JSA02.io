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
        // Save user object with login status
        user.isLoggedIn = true;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
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
    const userEmailExists = storedUsers.some(user => user.email === email);
    const userNameExists = storedUsers.some(user => user.name === name);

    if (userEmailExists) {
        alert('Email is already registered');
    } else if (userNameExists) {
        alert('Username is already registered');
    } else if (password.length < 8) {
        alert('Password must be at least 8 characters long');
    } else {
        // Store new user data in Local Storage
        const newUser = {
            name: name,
            email: email,
            password: password,
            isLoggedIn: false
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('Registration successful');
        // Save user object with login status
        newUser.isLoggedIn = true;
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        // Redirect to the main page after successful registration
        window.location.href = 'index.html';
    }
});

// Check login status
window.addEventListener('load', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.isLoggedIn) {
        // If logged in, redirect to main page
        window.location.href = 'index.html';
    }
});

const JSONToFile = (obj, fileName = "database.json") => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Example usage
const data = { test: 'is passed' };
JSONToFile(data, 'testJsonFile');