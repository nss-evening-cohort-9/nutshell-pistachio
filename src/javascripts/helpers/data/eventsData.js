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

const singleEventById = id => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events/${id}.json`)
    .then((resp) => {
      resolve(resp);
    })
    .catch(err => reject(err));
});

const addNewEvent = eventObject => axios.post(`${firebaseUrl}/events.json`, eventObject);

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

const updateEvent = (eventId, eventObj) => axios.put(`${firebaseUrl}/events/${eventId}.json`, eventObj);

export default {
  getEventsByUid,
  addNewEvent,
  deleteEvent,
  singleEventById,
  updateEvent,
};
