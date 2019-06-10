import firebase from 'firebase/app';
import 'firebase/auth';

import Axios from 'axios';

import newsfeed from '../newsfeed/newsfeed';
import userData from '../../helpers/data/userData';
import apiKeys from '../../helpers/apiKeys.json';
import events from '../events/events';
import messages from '../messages/messages';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const signInUser = () => {
  document.getElementById('signInBtn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

const signOutUser = () => {
  firebase.auth().signOut();
};

const firstTimeLogin = (user) => {
  const newUser = {
    uid: `${user.uid}`,
    email: `${user.email}`,
    displayName: `${user.displayName}`,
  };
  const currentUid = `${user.uid}`;
  userData.getUids().then((resp) => {
    const filteredUid = resp.filter(userId => userId === currentUid);
    if (filteredUid.length < 1) {
      console.error(filteredUid, 'New user added to Firebase');
      Axios.post(`${firebaseUrl}/user.json`, newUser);
    } else if (filteredUid.length >= 1) {
      console.error('User already Registered', filteredUid);
    }
  });
};

const checkLoginStatus = () => {
  const signInBtn = document.getElementById('signInBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  const dropdownBtn = document.getElementById('dropdownBtn');
  const app = document.getElementById('app');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firstTimeLogin(user);
      console.error('logged in');
      signInBtn.classList.add('hide');
      signOutBtn.classList.remove('hide');
      dropdownBtn.classList.remove('hide');
      app.classList.remove('hide');
      newsfeed.loadArticles();
      events.loadEvents(user.uid);
      messages.loadMessages();
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
