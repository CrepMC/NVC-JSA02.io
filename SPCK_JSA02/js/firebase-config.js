// Firebase Version: 10.12.4 !important
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAqt7k3gAP5CkemLNKoWrfSQ6qmGb1vq_8',
  authDomain: 'gamebotjsi02.firebaseapp.com',
  projectId: 'gamebotjsi02',
  storageBucket: 'gamebotjsi02.appspot.com',
  messagingSenderId: '1073096394585',
  appId: '1:1073096394585:web:c519c5d558cb9271b5ae48',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
