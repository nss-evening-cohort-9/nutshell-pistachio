import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signInUser = () => {
  document.getElementById('signInBtn').addEventListener('click', signIn);
};

export default { signInUser };
