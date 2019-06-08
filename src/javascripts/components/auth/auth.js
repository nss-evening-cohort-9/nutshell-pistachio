import firebase from 'firebase/app';
import 'firebase/auth';

import newsfeed from '../newsfeed/newsfeed';
import events from '../events/events';

const signInUser = () => {
  document.getElementById('signInBtn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

const signOutUser = () => {
  firebase.auth().signOut();
};

const checkLoginStatus = () => {
  const signInBtn = document.getElementById('signInBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  const dropdownBtn = document.getElementById('dropdownBtn');
  const app = document.getElementById('app');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.error('Logged In');
      signInBtn.classList.add('hide');
      signOutBtn.classList.remove('hide');
      dropdownBtn.classList.remove('hide');
      app.classList.remove('hide');
      newsfeed.loadArticles();
      events.loadEvents();
      signOutBtn.addEventListener('click', signOutUser);
    } else {
      console.error('Logged Out');
      signOutBtn.classList.add('hide');
      signInBtn.classList.remove('hide');
      app.classList.add('hide');
    }
  });
};

export default { signInUser, checkLoginStatus };
