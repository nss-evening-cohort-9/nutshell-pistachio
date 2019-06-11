import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMessagesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json?orderBy="uid"&equalTo="${uid}"`)
    .then((resp) => {
      const messageResults = resp.data;
      const messagesArray = [];
      Object.keys(messageResults).forEach((messageId) => {
        messageResults[messageId].id = messageId;
        messagesArray.push(messageResults[messageId]);
      });
      resolve(messagesArray);
    })
    .catch(err => reject(err));
});
const addNewMessage = messageObject => axios.post(`${firebaseUrl}/messages.json`, messageObject);

export default { getMessagesByUid, addNewMessage };
