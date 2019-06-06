import firebase from 'firebase/app';

import auth from './components/auth/auth';

import apiKeys from './helpers/apiKeys.json';

import 'bootstrap';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signInUser();
};

init();
