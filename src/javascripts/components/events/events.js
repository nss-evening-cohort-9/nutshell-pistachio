/* eslint-disable no-use-before-define */
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import eventsData from '../../helpers/data/eventsData';

const createNewEvent = (e) => {
  e.preventDefault();
  const newEvent = {
    eName: document.getElementById('event-name').value,
    location: document.getElementById('event-location').value,
    date: document.getElementById('event-date').value,
    time: document.getElementById('event-time').value,
    note: document.getElementById('event-note').value,
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.addNewEvent(newEvent)
    .then(() => {
      document.getElementById('event-name').value = '';
      document.getElementById('event-location').value = '';
      document.getElementById('event-date').value = '';
      document.getElementById('event-time').value = '';
      document.getElementById('event-note').value = '';
      document.getElementById('events').classList.remove('hide');
      document.getElementById('add-event').classList.add('hide');
      loadEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new event for you', err));
};

const deleteEventEvent = (e) => {
  const eventId = e.target.id;
  eventsData.deleteEvent(eventId)
    .then(() => loadEvents(firebase.auth().currentUser.uid))
    .catch(err => console.error('no delete for you', err));
};

const editEventEvent = (e) => {
  // eslint-disable-next-line prefer-destructuring
  const cardToEdit = e.target.closest('.card').id;
  eventsData.singleEventById(cardToEdit)
    .then((resp) => {
      const event = resp.data;
      document.getElementById('update-event-name').value = event.eName;
      document.getElementById('update-event-location').value = event.location;
      document.getElementById('update-event-date').value = event.date;
      document.getElementById('update-event-time').value = event.time;
      document.getElementById('update-event-note').value = event.note;
      document.getElementById('update-event-note').closest('form').id = cardToEdit;
      document.getElementById('edit-event').classList.remove('hide');
    })
    .catch(err => console.error('no edit for you', err));
  // const { id } = cardToEdit;
  // cardToEdit.querySelector('.note');

  // document.getElementById('event-name').value = id.eName;
  // document.getElementById('event-location').value = '';
  // document.getElementById('event-date').value = '';
  // document.getElementById('event-time').value = '';
  // document.getElementById('event-note').value = '';
  // document.getElementById('events').classList.remove('hide');
  // document.getElementById('add-event').classList.add('hide');
  // eslint-disable-line no-use-before-define
};
// const showUpdateEventForm = () => {

// };

const updateButtonEvent = (e) => {
  e.preventDefault();
  const eventId = e.target.closest('form').id;
  const editEvent = {
    eName: document.getElementById('update-event-name').value,
    location: document.getElementById('update-event-location').value,
    date: document.getElementById('update-event-date').value,
    time: document.getElementById('update-event-time').value,
    note: document.getElementById('update-event-note').value,
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.updateEvent(eventId, editEvent)
    .then(() => {
      loadEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
      document.getElementById('edit-event').classList.add('hide');
    })
    .catch(err => console.error('no update for you', err));
};

const eventEvents = () => {
  document.getElementById('saveNewEvent').addEventListener('click', createNewEvent);
  const deleteButtons = document.getElementsByClassName('delete-event');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteEventEvent);
  }
  const editButtons = document.getElementsByClassName('edit-event');
  for (let j = 0; j < editButtons.length; j += 1) {
    editButtons[j].addEventListener('click', editEventEvent);
  }
  const submitButton = document.getElementById('updateNewEventButton');
  submitButton.addEventListener('click', updateButtonEvent);
  // document.getElementsByClassName('edit').addEventListener('click', showUpdateEventForm);
};

const printEvents = (array) => {
  let domString = '';
  array.forEach((event) => {
    domString += `<div id="${event.id}" class="card" style="width: 18rem;">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${event.eName}</h5>`;
    domString += `<h6 class="card-subtitle mb-2 text-muted location">${event.location}</h6>`;
    domString += `<h6 class="card-subtitle mb-2 text-muted date">${event.date}</h6>`;
    domString += `<h6 class="card-subtitle mb-2 text-muted time">${event.time}</h6>`;
    domString += `<p class="card-text note">${event.note}</p>`;
    domString += `<button type="button" id="${event.id}" class="btn btn-danger delete-event">Delete</button>`;
    domString += '<button type="button" class="btn btn-primary edit-event">Edit</button>';
    domString += '</div>';
  });
  util.printToDom('events', domString);
  eventEvents();
};

const showNewEventForm = () => {
  document.getElementById('events').classList.add('hide');
  document.getElementById('new-event').classList.remove('hide');
};

document.getElementById('add-event').addEventListener('click', showNewEventForm);

// const showEvents = () => {
//   const domString = '<button id="add-events-button" class="btn btn-info">Add Event</button>';
//   util.printToDom('user-events', domString);
//   document.getElementById('add-events-button').addEventListener('click', newEventButton);
// };

// const updateEvent


const loadEvents = (uid) => {
  eventsData.getEventsByUid(uid).then((resp) => {
    printEvents(resp);
  }).catch(err => console.error('error from loadEvents', err));
};

export default { loadEvents };
