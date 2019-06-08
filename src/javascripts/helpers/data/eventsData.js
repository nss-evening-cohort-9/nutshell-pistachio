import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json`).then((resp) => {
    const events = resp.data;
    const eventsArray = [];
    Object.keys(events).forEach((event) => {
      eventsArray.push(events[event]);
    });
    resolve(eventsArray);
  }).catch(err => reject(err));
});

export default { getEvents };
