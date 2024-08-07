import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { auth } from './firebase-config.js';

import { handleRedirect, handleToast } from './ultis.js';

const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.querySelector('.container');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toast = document.querySelector('.toast');

(function handleUI() {
  signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });

  signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });
})();

// Register User
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  console.log(email, password);

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    handleToast('Register Success!', 'green');
    handleRedirect('index.html');
  } catch (error) {
    handleToast(error.message, 'red');
  }
});

// Login User
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    handleToast('Login Success!', 'green');
    handleRedirect('index.html');
  } catch (error) {
    handleToast(error.message, 'red');
  }
});

