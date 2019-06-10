import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMessages = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json`).then((resp) => {
    const messages = resp.data;
    const messageAr = [];
    Object.keys(messages).forEach((message) => {
      messageAr.push(messages[message]);
    });
    resolve(messageAr);
  }).catch(err => reject(err));
});

export default { getMessages };
