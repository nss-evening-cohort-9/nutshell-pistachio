import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((resp) => {
      const eventResults = resp.data;
      const eventsArray = [];
      Object.keys(eventResults).forEach((eventId) => {
        eventResults[eventId].id = eventId;
        eventsArray.push(eventResults[eventId]);
      });
      resolve(eventsArray);
    })
    .catch(err => reject(err));
});

const getSingleEvent = eventObject => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${eventObject}"`, eventObject.eName);
}

const addNewEvent = eventObject => axios.post(`${firebaseUrl}/events.json`, eventObject);

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

export default {
  getEventsByUid,
  addNewEvent,
  deleteEvent,
  getSingleEvent,
};
