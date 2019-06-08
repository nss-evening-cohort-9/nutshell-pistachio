import Axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getUids = () => new Promise((resolve, reject) => {
  Axios.get(`${firebaseUrl}/user.json`)
    .then((resp) => {
      const logins = resp.data;
      const loginAr = [];
      Object.keys(logins).forEach((login) => {
        const { uid } = logins[login];
        loginAr.push(uid);
      });
      resolve(loginAr);
    }).catch(err => reject(err));
});

export default { getUids };
